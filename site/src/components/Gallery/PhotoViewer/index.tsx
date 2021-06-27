import React, { FC, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

interface IProps {
    images: Array<string>
    isOpen: boolean
    onClose: () => void
}

const PhotoViewer: FC<IProps> = ({ images, isOpen, onClose }) => {
  const [photoIndex, setPhotoIndex] = useState(0)

  if (!isOpen) return null

  return (
    <Lightbox mainSrc={images[photoIndex]}
              nextSrc={images[(photoIndex + 1) % images.length]}
              prevSrc={images[(photoIndex + images.length - 1) % images.length]}
              onCloseRequest={onClose}
              onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
              onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}/>
  )
}

export default PhotoViewer
