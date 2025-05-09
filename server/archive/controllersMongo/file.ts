// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'File'.
const File = require('../modelsMongo/Files')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'errorHandl... Remove this comment to see the full error message
const errorHandler = require('../src/utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.uploadFile = async function (req: any, res: any) {
  let result = []
  for await (let file of req.files) {
    // @ts-expect-error TS(2554): Expected 2-3 arguments, but got 1.
    const newFile = new File({
      fieldName: req.body.fieldName,
      type: file.mimetype,
      preview: file.path
    })

    try {
      // @ts-expect-error TS(2339): Property 'save' does not exist on type 'File'.
      newFile.save()
      result.push(newFile)
    } catch (e) {
      errorHandler(res, e)
    }
  }
  res.status(201).json(result)
}

// module.exports.uploadFile = async function (req, res) {
//     let files = req.files.length === 1 ? req.files[0].path : []
//
//     req.files.length > 1 ? req.files.forEach(f => files.push(f.path)) : null
//
//     const file = new File({
//         fieldName: req.body.fieldName,
//         type: req.body.type,
//         preview: files
//     })
//
//     try {
//         await file.save()
//         res.status(201).json(file)
//     } catch (e) {
//         errorHandler(res, e)
//     }
// }
