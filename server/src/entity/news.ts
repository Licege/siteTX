// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'prepareIma... Remove this comment to see the full error message
const { prepareImageUrl } = require('../utils')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.makeNews = (newsData: any) => {
  if (!newsData) return null

  const { imageSrc, ...restNewsData } = newsData

  const preparedImageSrc = prepareImageUrl(imageSrc)

  return { ...restNewsData, imageSrc: preparedImageSrc }
}
