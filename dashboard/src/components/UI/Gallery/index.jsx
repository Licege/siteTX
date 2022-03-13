import React, {useState, useCallback} from 'react';
import {arrayMove, SortableContainer, SortableElement} from 'react-sortable-hoc';
import styled from 'styled-components';
import Photo from './Photo';

const SortablePhoto = SortableElement(item => <Photo {...item} />)
const SortableGallery = SortableContainer(({items, onClick}) => (
  <GalleryWrapper>
    {items.map((photo, index) => <SortablePhoto key={photo.src} index={index} onClick={onClick} photo={photo} />)}
  </GalleryWrapper>
))

const Gallery = ({photos = [], onClick}) => {
  const [items, setItems] = useState(photos);

  const onSortEnd = useCallback(({oldIndex, newIndex}) => setItems(arrayMove(items, oldIndex, newIndex)), [items])

  return (
    <SortableGallery items={items} onClick={onClick} distance={50} onSortEnd={onSortEnd} axis='xy' />
  )
}

const GalleryWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 16px;
`

export default Gallery;