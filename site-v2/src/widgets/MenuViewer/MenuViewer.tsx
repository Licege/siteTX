import { PhotoGallery, useGallery } from '@components';
// import { useLazyGetMenuImagesQuery, useRestaurantQuery } from '@entities';
import { useLazyGetMenuImagesQuery } from '@entities';

export const MenuViewer = () => {
  const { open } = useGallery();
  // const { data: restaurantData } = useRestaurantQuery();
  const [fetchMenu, menu] = useLazyGetMenuImagesQuery();

  console.log('menu', menu);

  const handleOpen = async () => {
    await fetchMenu({ type: 'bar', restaurantId: 3 });
    open();
  };

  const menuImages = (() => {
    if (!menu?.data) return [];

    // @ts-ignore
    return menu.data.images.map((image) => ({
      original: image.name,
      thumbnail: image.preview
    }));
  })();

  return (
    <div>
      <button onClick={handleOpen}>отрыть</button>
      <PhotoGallery items={menuImages} />
    </div>
  );
};
