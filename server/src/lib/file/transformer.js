const sharp = require('sharp')

exports.fileTransformer = (
  buffer,
  { format = '', width, height, destination, toBuffer = false, onFinish } = {}
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
