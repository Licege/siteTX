import React from 'react';
import ImageGallery from 'react-image-gallery';
import {imageForGalleryType} from "../../types/types";

type PropsType = {
    images: Array<imageForGalleryType>
}

const Gallery: React.FC<PropsType> = ( {images} ) => {
    return (
        <div className='page-container'>
                <h4 className='page-container-title'>~ Галлерея ~</h4>
                <ImageGallery items={images} />
            </div>
    )
};

export default Gallery;