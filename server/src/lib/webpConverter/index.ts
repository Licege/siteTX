const webp = require('webp-converter')

webp.grant_permission()

const ALLOW_IMAGE_EXT = ['jpeg', 'jpg', 'png']
const DEFAULT_QUALITY = 75

const convertFileToWebp = async (
  pathToFile,
  { quality = DEFAULT_QUALITY } = {}
) => {
  const fileWithExt = pathToFile.split('/').pop()
  const [fileName, fileExt] = fileWithExt.split('.')

  if (!ALLOW_IMAGE_EXT.includes(fileExt.toLowerCase())) return pathToFile
  return webp.cwebp(pathToFile, `./${fileName}.webp`, `-q ${quality}`)
}

// Example:
// convertFileToWebp('/Users/licege/Documents/TriXolmaProject/siteTX/server/uploads/28072021-210959_580-maxresdefault.jpeg').then(res => {
//   console.log(res)
// })

module.exports = {
  convertFileToWebp
}
