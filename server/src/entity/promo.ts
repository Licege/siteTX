import { prepareImageUrl } from '../utils';

export const makePromo = (promoData: any) => {
  if (!promoData) return null

  const { imageSrc, ...restPromoData } = promoData

  const preparedImageSrc = prepareImageUrl(imageSrc)

  return { ...restPromoData, imageSrc: preparedImageSrc }
}
