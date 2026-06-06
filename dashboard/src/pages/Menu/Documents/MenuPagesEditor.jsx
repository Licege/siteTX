import React, {useCallback} from 'react'
import styled from 'styled-components'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'

const SortablePage = SortableElement(({page, onDelete, onSelectPreview, isPreview}) => (
  <PageItem>
    <PageImage src={page.previewUrl} alt="" draggable={false} $isPreview={isPreview} />
    <PreviewButton type="button" onClick={() => onSelectPreview(page.path)} $active={isPreview}>
      {isPreview ? 'Превью' : 'Сделать превью'}
    </PreviewButton>
    <DeleteButton type="button" onClick={() => onDelete(page.id)} aria-label="Удалить страницу">
      ×
    </DeleteButton>
    <PageNumber>{page.orderIndex + 1}</PageNumber>
  </PageItem>
))

const SortablePages = SortableContainer(({pages, onDelete, onSelectPreview, previewPath}) => (
  <PagesGrid>
    {pages.map((page, index) => (
      <SortablePage key={page.id} index={index} page={{...page, orderIndex: index}} onDelete={onDelete} onSelectPreview={onSelectPreview} isPreview={previewPath === page.path} />
    ))}
  </PagesGrid>
))

const MenuPagesEditor = ({pages, onSortEnd, onDelete, onSelectPreview, previewPath}) => {
  const handleSortEnd = useCallback(
    ({oldIndex, newIndex}) => onSortEnd(oldIndex, newIndex),
    [onSortEnd]
  )

  if (!pages.length) {
    return <EmptyState>Загрузите PDF или изображения, чтобы добавить страницы меню</EmptyState>
  }

  return (
    <SortablePages pages={pages} onDelete={onDelete} onSortEnd={handleSortEnd} onSelectPreview={onSelectPreview} previewPath={previewPath} axis="xy" distance={8} helperClass="menu-page-dragging" />
  )
}

const PagesGrid = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 16px;
`

const PageItem = styled.div`
  position: relative;
  width: 140px;
`

const PageImage = styled.img`
  width: 140px;
  height: 190px;
  object-fit: cover;
  border-radius: 4px;
  border: 2px solid ${({$isPreview}) => ($isPreview ? '#1f6feb' : '#ddd')};
  cursor: grab;
  background: #f5f5f5;
`

const PreviewButton = styled.button`
  width: 100%;
  margin-top: 6px;
  border: 1px solid ${({$active}) => ($active ? '#1f6feb' : '#ccc')};
  background: ${({$active}) => ($active ? '#e8f0fe' : '#fff')};
  color: ${({$active}) => ($active ? '#1f6feb' : '#333')};
  border-radius: 4px;
  font-size: 12px;
  padding: 4px 6px;
  cursor: pointer;
`

const DeleteButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.65);
  color: #fff;
  cursor: pointer;
  line-height: 1;
  font-size: 18px;
`

const PageNumber = styled.div`
  margin-top: 6px;
  text-align: center;
  color: #666;
  font-size: 13px;
`

const EmptyState = styled.div`
  color: #777;
  padding: 12px 0;
`

export default MenuPagesEditor
