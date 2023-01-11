// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'path'.
const path = require('path')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'fileLib'.
const fileLib = require('../lib/file')

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.downloadFiles = async (req: any, res: any) => {}

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.testUploadFiles = async (req: any, res: any) => {
  try {
    // @ts-expect-error TS(2304): Cannot find name '__dirname'.
    const destination = path.resolve(__dirname, '../../', 'uploads')
    const src = await fileLib.uploadFile(req.file, destination, {
      format: 'webp'
    })
    res.send(200).json({ src })
  } catch (e) {
    console.error(e)
  }
}
