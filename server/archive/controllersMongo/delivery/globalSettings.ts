// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'GlobalSett... Remove this comment to see the full error message
const GlobalSettings = require('../../modelsMongo/delivery/GlobalSettings')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'errorHandl... Remove this comment to see the full error message
const errorHandler = require('../../src/utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.get = async function (req: any, res: any) {
  try {
    const settings = await GlobalSettings.findOne({})
    res.status(200).json(settings)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.update = async function (req: any, res: any) {
  try {
    const settings = await GlobalSettings.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(settings)
  } catch (e) {
    errorHandler(res, e)
  }
}
