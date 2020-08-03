import React from 'react'
import ImageGallery from 'react-image-gallery'
import { imageForGalleryType } from '../../types/types'

type PropsType = {
    images: Array<imageForGalleryType>
}

const Gallery: React.FC<PropsType> = ( {images} ) => {
    return (
        <main className='page-container'>
            <h1 className='page-container-title'>~ Галлерея ~</h1>
            <ImageGallery items={images}/>
        </main>
    )
}

export default Gallery
