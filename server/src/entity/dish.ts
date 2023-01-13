import { prepareImageUrl } from '../utils';

export const makeDish = (dishData: any) => {
  if (!dishData) return null

  const { imageSrc, ...restDishData } = dishData

  const preparedImageSrc = prepareImageUrl(imageSrc)

  return { ...restDishData, imageSrc: preparedImageSrc }
}
