import { prepareImageUrl } from '../utils';

export const makeNews = (newsData: any) => {
  if (!newsData) return null

  const { imageSrc, ...restNewsData } = newsData

  const preparedImageSrc = prepareImageUrl(imageSrc)

  return { ...restNewsData, imageSrc: preparedImageSrc }
}
