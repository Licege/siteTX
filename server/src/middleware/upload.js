const multer = require('multer')

const ALLOWED_MIMES = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'application/pdf'
])

const ALLOWED_EXTENSIONS = /\.(png|jpe?g|webp|pdf)$/i

const fileFilter = (req, file, callback) => {
  const mimetype = file.mimetype || ''
  const filename = file.originalname || ''

  if (ALLOWED_MIMES.has(mimetype)) {
    callback(null, true)
    return
  }

  if (ALLOWED_EXTENSIONS.test(filename)) {
    callback(null, true)
    return
  }

  callback(null, false)
}

const limits = {
  fileSize: 1024 * 1024 * 6
}

module.exports = multer({ storage: multer.memoryStorage(), fileFilter, limits })
