import { prepareImageUrl } from '../utils';

export const makeVacancy = (vacancyData: any) => {
  if (!vacancyData) return null

  const { imageSrc, ...restVacancyData } = vacancyData

  const preparedImageSrc = prepareImageUrl(imageSrc)

  return { ...restVacancyData, imageSrc: preparedImageSrc }
}
