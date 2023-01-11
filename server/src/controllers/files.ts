const path = require('path')
const fileLib = require('../lib/file')

exports.downloadFiles = async (req, res) => {}

exports.testUploadFiles = async (req, res) => {
  try {
    const destination = path.resolve(__dirname, '../../', 'uploads')
    const src = await fileLib.uploadFile(req.file, destination, {
      format: 'webp'
    })
    res.send(200).json({ src })
  } catch (e) {
    console.error(e)
  }
}
