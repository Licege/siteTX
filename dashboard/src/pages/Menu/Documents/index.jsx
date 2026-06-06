import React, {useCallback, useEffect, useMemo, useState} from 'react'
import styled, {createGlobalStyle} from 'styled-components'
import {Button} from 'react-bootstrap'
import {arrayMove} from 'react-sortable-hoc'
import {PageHeader} from '../../../styledComponents/components'
import {menuDocumentsAPI} from '../../../api/api'
import MenuPagesEditor from './MenuPagesEditor'

const DragStyles = createGlobalStyle`
  .menu-page-dragging {
    z-index: 1000;
  }
`

const MENU_TYPES = [
  {type: 'menu', title: 'Меню ресторана'},
  {type: 'bar', title: 'Меню бара'},
  {type: 'banquet', title: 'Банкетное меню'}
]

const buildFileUrl = (path) => {
  if (!path) return ''
  if (path.startsWith('http') || path.startsWith('//')) return path
  return `//${window.location.hostname}/${path.replace(/^\//, '')}`
}

const IMAGE_EXTENSIONS = /\.(png|jpe?g|webp)$/i

const isPdfFile = (file) =>
  file.type === 'application/pdf' || /\.pdf$/i.test(file.name || '')

const isImageFile = (file) =>
  file.type.startsWith('image/') || IMAGE_EXTENSIONS.test(file.name || '')

const mapDocumentToPages = (document) =>
  (document?.files || []).map((filePath) => ({
    id: filePath,
    path: filePath,
    previewUrl: buildFileUrl(filePath),
    isExisting: true
  }))

const mapSplitPages = (pages) =>
  pages.map((page) => ({
    id: page.path,
    path: page.path,
    previewUrl: buildFileUrl(page.path),
    isTemp: true
  }))

const mapDocumentPreview = (document) => {
  const pages = document?.files || []
  const previewSrc = document?.previewSrc

  if (!previewSrc) {
    return {kind: 'auto'}
  }

  if (pages.includes(previewSrc)) {
    return {kind: 'page', path: previewSrc}
  }

  return {
    kind: 'existing',
    path: previewSrc,
    previewUrl: buildFileUrl(previewSrc)
  }
}

const getPagesSnapshot = (pages) =>
  pages.map((page) => {
    if (page.isExisting) return `e:${page.path}`
    if (page.isTemp) return `t:${page.path}`
    return `n:${page.id}`
  }).join('|')

const getPreviewSnapshot = (preview) => {
  if (preview.kind === 'auto') return 'auto'
  if (preview.kind === 'page') return `page:${preview.path}`
  if (preview.kind === 'existing') return `existing:${preview.path}`
  if (preview.kind === 'temp') return `temp:${preview.path}`
  return 'auto'
}

const buildSavePayload = (pages, preview) => {
  const pagesPayload = pages.map((page) => {
    if (page.isExisting) {
      return {kind: 'existing', path: page.path}
    }

    if (page.isTemp) {
      return {kind: 'temp', path: page.path}
    }

    return null
  }).filter(Boolean)

  let previewPayload = {kind: 'auto'}

  if (preview.kind === 'page') {
    previewPayload = {kind: 'page', path: preview.path}
  } else if (preview.kind === 'existing') {
    previewPayload = {kind: 'existing', path: preview.path}
  } else if (preview.kind === 'temp') {
    previewPayload = {kind: 'temp', path: preview.path}
  }

  return {pages: pagesPayload, preview: previewPayload}
}

const getPreviewImageUrl = (preview, pages) => {
  if (preview.kind === 'existing' || preview.kind === 'temp') {
    return preview.previewUrl || buildFileUrl(preview.path)
  }

  if (preview.kind === 'page') {
    const page = pages.find((item) => item.path === preview.path)
    return page?.previewUrl || ''
  }

  const firstPage = pages[0]
  return firstPage?.previewUrl || ''
}

const isCustomPreview = (preview, pages) => {
  if (preview.kind === 'temp') return true

  if (preview.kind === 'existing') {
    return !pages.some((page) => page.path === preview.path)
  }

  return false
}

const getPreviewMode = (preview, pages) => (isCustomPreview(preview, pages) ? 'custom' : 'page')

const getEffectivePreviewPath = (preview, pages) => {
  if (preview.kind === 'page') return preview.path
  if (preview.kind === 'auto' && pages[0]) return pages[0].path

  return null
}

const MenuDocumentCard = ({type, title, document, onSave, saving}) => {
  const [pages, setPages] = useState(() => mapDocumentToPages(document))
  const [preview, setPreview] = useState(() => mapDocumentPreview(document))
  const [savedSnapshot, setSavedSnapshot] = useState(() => ({
    pages: getPagesSnapshot(mapDocumentToPages(document)),
    preview: getPreviewSnapshot(mapDocumentPreview(document))
  }))
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [previewMode, setPreviewMode] = useState(() => getPreviewMode(mapDocumentPreview(document), mapDocumentToPages(document)))

  useEffect(() => {
    const mappedPages = mapDocumentToPages(document)
    const mappedPreview = mapDocumentPreview(document)

    setPages(mappedPages)
    setPreview(mappedPreview)
    setPreviewMode(getPreviewMode(mappedPreview, mappedPages))
    setSavedSnapshot({
      pages: getPagesSnapshot(mappedPages),
      preview: getPreviewSnapshot(mappedPreview)
    })
  }, [document])

  const currentSnapshot = useMemo(() => ({
    pages: getPagesSnapshot(pages),
    preview: getPreviewSnapshot(preview)
  }), [pages, preview])

  const hasChanges = currentSnapshot.pages !== savedSnapshot.pages
    || currentSnapshot.preview !== savedSnapshot.preview

  const effectivePreviewPath = getEffectivePreviewPath(preview, pages)
  const previewImageUrl = getPreviewImageUrl(preview, pages)
  const customPreviewActive = previewMode === 'custom'
  const pagePreviewActive = previewMode === 'page'

  const onFilesUpload = async (event) => {
    const files = Array.from(event.target.files || [])
    event.target.value = ''

    if (!files.length) return

    const pdfFiles = files.filter(isPdfFile)
    const imageFiles = files.filter(isImageFile)

    if (!pdfFiles.length && !imageFiles.length) {
      setError('Выберите PDF или изображения (PNG, JPEG, WebP)')
      return
    }

    if (pdfFiles.length && imageFiles.length) {
      setError('Загружайте PDF и изображения отдельно')
      return
    }

    if (pdfFiles.length > 1) {
      setError('Загружайте один PDF за раз')
      return
    }

    setUploading(true)
    setError('')

    try {
      if (pdfFiles.length === 1) {
        const formData = new FormData()
        formData.append('pdf', pdfFiles[0])

        const response = await menuDocumentsAPI.splitPdf(formData)
        setPages((prevPages) => [...prevPages, ...mapSplitPages(response.pages || [])])
      }

      if (imageFiles.length) {
        const formData = new FormData()
        imageFiles.forEach((file) => formData.append('images', file))

        const response = await menuDocumentsAPI.uploadImages(formData)
        setPages((prevPages) => [...prevPages, ...mapSplitPages(response.pages || [])])
      }
    } catch (uploadError) {
      console.error(uploadError)
      setError('Не удалось загрузить файлы')
    } finally {
      setUploading(false)
    }
  }

  const onCustomPreviewUpload = async (file) => {
    if (!file) return

    if (!isImageFile(file)) {
      setError('Выберите изображение (PNG, JPEG, WebP)')
      return
    }

    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('images', file)

      const response = await menuDocumentsAPI.uploadImages(formData)
      const uploadedPreview = response.pages?.[0]

      if (!uploadedPreview) {
        throw new Error('Preview upload failed')
      }

      setPreviewMode('custom')
      setPreview({
        kind: 'temp',
        path: uploadedPreview.path,
        previewUrl: buildFileUrl(uploadedPreview.path)
      })
    } catch (uploadError) {
      console.error(uploadError)
      setError('Не удалось загрузить превью')
    } finally {
      setUploading(false)
    }
  }

  const onCustomPreviewFileChange = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) return

    await onCustomPreviewUpload(file)
  }

  const onSortEnd = useCallback((oldIndex, newIndex) => {
    setPages((prevPages) => arrayMove(prevPages, oldIndex, newIndex))
  }, [])

  const onDelete = useCallback((pageId) => {
    setPages((prevPages) => {
      const deletedPage = prevPages.find((page) => page.id === pageId)
      const nextPages = prevPages.filter((page) => page.id !== pageId)

      if (deletedPage && preview.kind === 'page' && preview.path === deletedPage.path) {
        setPreview({kind: 'auto'})
      }

      return nextPages
    })
  }, [preview])

  const onSelectPreview = useCallback((path) => {
    setPreviewMode('page')
    setPreview({kind: 'page', path})
  }, [])

  const onUseAutoPreview = useCallback(() => {
    setPreviewMode('page')
    setPreview({kind: 'auto'})
  }, [])

  const onUsePagePreviewMode = useCallback(() => {
    setPreviewMode('page')

    if (isCustomPreview(preview, pages)) {
      setPreview(pages.length ? {kind: 'auto'} : {kind: 'auto'})
    }
  }, [preview, pages])

  const onUseCustomPreviewMode = useCallback(() => {
    setPreviewMode('custom')
  }, [])

  const getPagePreviewLabel = () => {
    if (preview.kind === 'page') {
      const pageIndex = pages.findIndex((page) => page.path === preview.path)

      if (pageIndex >= 0) {
        return `Страница ${pageIndex + 1}`
      }
    }

    if (preview.kind === 'auto' && pages.length) {
      return 'Первая страница'
    }

    return 'Страница не выбрана'
  }

  const handleSave = async () => {
    setError('')

    if (previewMode === 'custom' && !isCustomPreview(preview, pages)) {
      setError('Загрузите своё изображение для превью')
      return
    }

    try {
      await onSave(type, buildSavePayload(pages, preview))
      setSavedSnapshot(currentSnapshot)
    } catch (saveError) {
      console.error(saveError)
      setError('Не удалось сохранить меню')
    }
  }

  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      <CardBody>
        <Field>
          <FieldLabel>Загрузить PDF или изображения</FieldLabel>
          <FileInput type="file" accept="application/pdf,image/png,image/jpeg,image/webp" multiple disabled={uploading || saving} onChange={onFilesUpload} />
          {uploading && <Hint>Обрабатываем файлы...</Hint>}
        </Field>

        <Field>
          <FieldLabel>Страницы меню</FieldLabel>
          <Hint>Перетаскивайте страницы с зажатой кнопкой мыши. Клик по картинке — предпросмотр.</Hint>
          <MenuPagesEditor pages={pages} onSortEnd={onSortEnd} onDelete={onDelete} onSelectPreview={onSelectPreview} previewPath={pagePreviewActive ? effectivePreviewPath : null} />
        </Field>

        <Field>
          <FieldLabel>Превью на сайте</FieldLabel>
          <PreviewControls>
            <Button variant={pagePreviewActive ? 'primary' : 'outline-primary'} size="sm" onClick={onUsePagePreviewMode} disabled={!pages.length}>
              Страница из меню
            </Button>
            <Button variant={customPreviewActive ? 'primary' : 'outline-primary'} size="sm" onClick={onUseCustomPreviewMode}>
              Своё изображение
            </Button>
          </PreviewControls>

          {pagePreviewActive && (
            <PreviewPanel>
              <Hint>Нажмите «Сделать превью» под нужной страницей или выберите первую.</Hint>
              <PreviewControls>
                <Button variant={preview.kind === 'auto' ? 'primary' : 'outline-primary'} size="sm" onClick={onUseAutoPreview} disabled={!pages.length}>
                  Первая страница
                </Button>
              </PreviewControls>
              {previewImageUrl && (
                <PreviewPreview>
                  <PreviewImage src={previewImageUrl} alt="" />
                  <PreviewCaption>{getPagePreviewLabel()}</PreviewCaption>
                </PreviewPreview>
              )}
            </PreviewPanel>
          )}

          {customPreviewActive && (
            <PreviewPanel>
              <Hint>Загрузите отдельное изображение для карточки на сайте. Оно не добавится в страницы меню.</Hint>
              <FileInput type="file" accept="image/png,image/jpeg,image/webp" disabled={uploading || saving} onChange={onCustomPreviewFileChange} />
              {previewImageUrl && isCustomPreview(preview, pages) ? (
                <PreviewPreview>
                  <PreviewImage src={previewImageUrl} alt="" />
                  <PreviewCaption>Загруженное превью</PreviewCaption>
                </PreviewPreview>
              ) : (
                <Hint>Файл не выбран</Hint>
              )}
            </PreviewPanel>
          )}
        </Field>

        {error && <ErrorText>{error}</ErrorText>}

        <Button variant="primary" disabled={!hasChanges || saving || uploading} onClick={handleSave}>
          {saving ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </CardBody>
    </Card>
  )
}

const MenuDocuments = () => {
  const [documents, setDocuments] = useState({})
  const [loading, setLoading] = useState(true)
  const [savingType, setSavingType] = useState('')

  const loadDocuments = useCallback(async () => {
    setLoading(true)

    try {
      const response = await menuDocumentsAPI.getAll()
      const mapped = response.reduce((acc, item) => {
        acc[item.type.toLowerCase()] = item
        return acc
      }, {})

      setDocuments(mapped)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadDocuments()
  }, [loadDocuments])

  const saveDocument = async (type, payload) => {
    setSavingType(type)

    try {
      const updated = await menuDocumentsAPI.update(type, payload)
      setDocuments((prev) => ({
        ...prev,
        [type]: updated
      }))
    } finally {
      setSavingType('')
    }
  }

  if (loading) return null

  return (
    <div>
      <DragStyles />
      <PageHeader title="PDF-меню" />
      <PageContainer>
        {MENU_TYPES.map(({type, title}) => (
          <MenuDocumentCard key={type} type={type} title={title} document={documents[type]} onSave={saveDocument} saving={savingType === type} />
        ))}
      </PageContainer>
    </div>
  )
}

const PageContainer = styled.div`
  display: grid;
  grid-gap: 24px;
  padding: 24px;
`

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`

const CardTitle = styled.h4`
  margin: 0;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
`

const CardBody = styled.div`
  padding: 20px;
  display: grid;
  grid-gap: 16px;
`

const Field = styled.div`
  display: grid;
  grid-gap: 8px;
`

const FieldLabel = styled.div`
  font-weight: 600;
`

const Hint = styled.div`
  color: #777;
  font-size: 14px;
`

const ErrorText = styled.div`
  color: #c0392b;
  font-size: 14px;
`

const FileInput = styled.input`
  display: block;
`

const PreviewControls = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

const PreviewPanel = styled.div`
  display: grid;
  grid-gap: 10px;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fafafa;
`

const PreviewPreview = styled.div`
  display: grid;
  grid-gap: 8px;
  justify-items: start;
`

const PreviewImage = styled.img`
  width: 180px;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #ddd;
  background: #fff;
`

const PreviewCaption = styled.div`
  color: #666;
  font-size: 13px;
`

export default MenuDocuments
