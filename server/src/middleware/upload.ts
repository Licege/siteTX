import multer from 'multer'

const fileFilter = (req: any, file: any, callback: any) => {
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

export default multer({ storage: multer.memoryStorage(), fileFilter, limits })
