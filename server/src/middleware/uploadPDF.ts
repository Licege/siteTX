// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'multer'.
const multer = require('multer')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const moment = require('moment')

const storage = multer.diskStorage({
  destination(req: any, file: any, callback: any) {
    callback(null, 'uploads/')
  },
  filename(req: any, file: any, callback: any) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS')
    callback(null, `${date}`)
  }
})

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'fileFilter... Remove this comment to see the full error message
const fileFilter = (req: any, file: any, callback: any) => {
  if (file.mimetype === 'application/pdf') {
    callback(null, true)
  } else {
    callback(null, false)
  }
}

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'limits'.
const limits = {
  fileSize: 1024 * 1024 * 6
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = multer({ storage, fileFilter, limits })
