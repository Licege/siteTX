// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'CommonDeli... Remove this comment to see the full error message
const CommonDelivery = require('../../modelsMongo/delivery/CommonSettings')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'errorHandl... Remove this comment to see the full error message
const errorHandler = require('../../src/utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getAll = async function (req: any, res: any) {
  try {
    const settings = await CommonDelivery.find({})
    res.status(200).json(settings)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getById = async function (req: any, res: any) {
  try {
    const settings = await CommonDelivery.findOne({ _id: req.params.id })
    res.status(200).json(settings)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.create = async function (req: any, res: any) {
  try {
    const settings = await new CommonDelivery(req.body).save()
    res.status(200).json(settings)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.update = async function (req: any, res: any) {
  try {
    const settings = await CommonDelivery.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(settings)
  } catch (e) {
    errorHandler(res, e)
  }
}
