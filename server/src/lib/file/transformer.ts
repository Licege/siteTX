// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const sharp = require('sharp')

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.fileTransformer = (
  buffer: any,
  {
    format = '',
    width,
    height,
    destination,
    toBuffer = false,
    onFinish
  }: any = {}
) => {
  let transformer = sharp(buffer)

  if (format) {
    transformer = transformer.toFormat(format)
  }

  if (width && height) {
    transformer = transformer.resize(width, height)
  }

  if (destination) {
    return transformer.toFile(destination, onFinish)
  }

  if (toBuffer) {
    return transformer.toBuffer({}, onFinish)
  }

  return transformer
}
