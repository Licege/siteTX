import React from 'react';
import ImageGallery from 'react-image-gallery';
import {imageForGalleryType} from "../../types/types";

type PropsType = {
    images: Array<imageForGalleryType>
}

const Gallery: React.FC<PropsType> = ( {images} ) => {
    return (
        <div className='card'>
            <div className='card-body'>
                <h4 className='page-title'>~ Галлерея ~</h4>
                <ImageGallery items={images} />
            </div>
        </div>
    )
};

export default Gallery;