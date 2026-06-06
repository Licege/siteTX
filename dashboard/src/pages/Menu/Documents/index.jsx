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

const getPagesSnapshot = (pages) =>
  pages.map((page) => {
    if (page.isExisting) return `e:${page.path}`
    if (page.isTemp) return `t:${page.path}`
    return `n:${page.id}`
  }).join('|')

const buildSavePayload = (pages) =>
  pages.map((page) => {
    if (page.isExisting) {
      return {kind: 'existing', path: page.path}
    }

    if (page.isTemp) {
      return {kind: 'temp', path: page.path}
    }

    return null
  }).filter(Boolean)

const MenuDocumentCard = ({type, title, document, onSave, saving}) => {
  const [pages, setPages] = useState(() => mapDocumentToPages(document))
  const [savedSnapshot, setSavedSnapshot] = useState(() => getPagesSnapshot(mapDocumentToPages(document)))
  const [splitting, setSplitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const mappedPages = mapDocumentToPages(document)
    setPages(mappedPages)
    setSavedSnapshot(getPagesSnapshot(mappedPages))
  }, [document])

  const currentSnapshot = useMemo(() => getPagesSnapshot(pages), [pages])
  const hasChanges = currentSnapshot !== savedSnapshot

  const onPdfUpload = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) return

    setSplitting(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('pdf', file)

      const response = await menuDocumentsAPI.splitPdf(formData)
      const newPages = mapSplitPages(response.pages || [])

      setPages((prevPages) => [...prevPages, ...newPages])
    } catch (uploadError) {
      console.error(uploadError)
      setError('Не удалось разделить PDF на страницы')
    } finally {
      setSplitting(false)
    }
  }

  const onSortEnd = useCallback((oldIndex, newIndex) => {
    setPages((prevPages) => arrayMove(prevPages, oldIndex, newIndex))
  }, [])

  const onDelete = useCallback((pageId) => {
    setPages((prevPages) => prevPages.filter((page) => page.id !== pageId))
  }, [])

  const handleSave = async () => {
    setError('')

    try {
      await onSave(type, buildSavePayload(pages))
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
          <FieldLabel>Загрузить PDF</FieldLabel>
          <PdfInput type="file" accept="application/pdf" disabled={splitting || saving} onChange={onPdfUpload} />
          {splitting && <Hint>Разделяем PDF на страницы на сервере...</Hint>}
        </Field>

        <Field>
          <FieldLabel>Страницы меню</FieldLabel>
          <Hint>Перетаскивайте для изменения порядка. Удаляйте ненужные страницы.</Hint>
          <MenuPagesEditor pages={pages} onSortEnd={onSortEnd} onDelete={onDelete} />
        </Field>

        {error && <ErrorText>{error}</ErrorText>}

        <Button variant="primary" disabled={!hasChanges || saving || splitting} onClick={handleSave}>
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

  const saveDocument = async (type, pages) => {
    setSavingType(type)

    try {
      const updated = await menuDocumentsAPI.update(type, pages)
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

const PdfInput = styled.input`
  display: block;
`

export default MenuDocuments
