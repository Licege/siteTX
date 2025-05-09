import sharp from 'sharp';

export const fileTransformer = (
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
    // @ts-ignore
    return transformer.toBuffer({}, onFinish)
  }

  return transformer
}
