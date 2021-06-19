import React, { FC, useState, useCallback } from 'react'
import PhotoViewer from '../../../components/Gallery/PhotoViewer';
import ImageWithBackground from '../../../components/core/ImageWithBackground';
import menuImg from '../../../static/img/menu.jpg'

interface IProps {
    images: Array<string>
}

const Gallery: FC<IProps> = ({ images }) => {
    const [isOpen, setIsOpen] = useState(false)

    const onOpen = useCallback(() => {
        setIsOpen(true)
    }, []);

    const onClose = useCallback(() => {
        setIsOpen(false)
    }, []);

    return (
        <>
            <ImageWithBackground imageSrc={menuImg} onClick={onOpen} />
            <PhotoViewer images={images} isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default Gallery