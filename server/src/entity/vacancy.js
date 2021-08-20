const { prepareImageUrl } = require('../utils');

module.exports.makeVacancy = (vacancyData) => {
  if (!vacancyData) return null

  const { imageSrc, ...restVacancyData } = vacancyData

  const preparedImageSrc = prepareImageUrl(imageSrc)

  return { ...restVacancyData, imageSrc: preparedImageSrc }
}