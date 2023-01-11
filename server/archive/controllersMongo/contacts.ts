// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Contacts'.
const Contacts = require('../modelsMongo/Contacts')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'handlerErr... Remove this comment to see the full error message
const handlerError = require('../src/utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.get = async function (req: any, res: any) {
  try {
    const contacts = await Contacts.findOne({})
    res.status(200).json(contacts)
  } catch (e) {
    handlerError(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.update = async function (req: any, res: any) {
  try {
    const contacts = await Contacts.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(contacts)
  } catch (e) {
    handlerError(res, e)
  }
}
