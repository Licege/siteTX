import { MutableRefObject } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import { PhotoGalleryItem } from './PhotoGallery.types';

export { useGallery } from 'react-photoswipe-gallery';

interface PhotoGalleryProps {
  items: PhotoGalleryItem[]
}

export const PhotoGallery = ({ items }: PhotoGalleryProps) => {
  return (
    <Gallery>
      {items.map((item) => (
        <Item original={item.original}
              thumbnail={item.thumbnail}
              width={item.width}
              height={item.height}>
          {({ ref, open }) => (
            <img ref={ref as MutableRefObject<HTMLImageElement>} onClick={open} src={item.original} alt={item.alt} />
          )}
        </Item>
      ))}
    </Gallery>
  );
};