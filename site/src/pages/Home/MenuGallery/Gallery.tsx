import React, { FC, useState, useCallback } from 'react'
import PhotoViewer from '../../../components/Gallery/PhotoViewer';
import ImageWithBackground from '../../../components/core/ImageWithBackground';

interface IProps {
  images: Array<string>
  backgroundImage: string
}

const Gallery: FC<IProps> = ({ backgroundImage, images }) => {
  const [isOpen, setIsOpen] = useState(false)

  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, []);

  return (
    <>
      <ImageWithBackground imageSrc={backgroundImage} onClick={onOpen} />
      <PhotoViewer images={images} isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default Gallery