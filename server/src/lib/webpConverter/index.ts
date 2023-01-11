// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const webp = require('webp-converter')

webp.grant_permission()

const ALLOW_IMAGE_EXT = ['jpeg', 'jpg', 'png']
const DEFAULT_QUALITY = 75

const convertFileToWebp = async (
  pathToFile: any,
  { quality = DEFAULT_QUALITY } = {}
) => {
  const fileWithExt = pathToFile.split('/').pop()
  const [fileName, fileExt] = fileWithExt.split('.')

  // @ts-expect-error TS(2550): Property 'includes' does not exist on type 'string... Remove this comment to see the full error message
  if (!ALLOW_IMAGE_EXT.includes(fileExt.toLowerCase())) return pathToFile
  return webp.cwebp(pathToFile, `./${fileName}.webp`, `-q ${quality}`)
}

// Example:
// convertFileToWebp('/Users/licege/Documents/TriXolmaProject/siteTX/server/uploads/28072021-210959_580-maxresdefault.jpeg').then(res => {
//   console.log(res)
// })

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = {
  convertFileToWebp
}
