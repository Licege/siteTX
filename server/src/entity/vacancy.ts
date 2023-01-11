// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'prepareIma... Remove this comment to see the full error message
const { prepareImageUrl } = require('../utils')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.makeVacancy = (vacancyData: any) => {
  if (!vacancyData) return null

  const { imageSrc, ...restVacancyData } = vacancyData

  const preparedImageSrc = prepareImageUrl(imageSrc)

  return { ...restVacancyData, imageSrc: preparedImageSrc }
}
