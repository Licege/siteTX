const multer = require('multer')

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'application/pdf'
  ) {
    callback(null, true)
  } else {
    callback(null, false)
  }
}

const limits = {
  fileSize: 1024 * 1024 * 6
}

module.exports = multer({ storage: multer.memoryStorage(), fileFilter, limits })
