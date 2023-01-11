// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'express'.
const express = require('express')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const controller = require('../../controllersMongo/file')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'router'.
const router = express.Router()
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'upload'.
const upload = require('../middleware/upload')

router.post('/', upload.array('files', 25), controller.uploadFile)

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = router
