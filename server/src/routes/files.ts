// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'express'.
const express = require('express')
const controller = require('../../controllersMongo/file')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'router'.
const router = express.Router()
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'upload'.
const upload = require('../middleware/upload')

router.post('/', upload.array('files', 25), controller.uploadFile)

module.exports = router
