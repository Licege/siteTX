// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'ComplainTy... Remove this comment to see the full error message
const ComplainType = require('../repositories/complainType')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const errorsHandler = require('../utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getAll = async function (req: any, res: any) {
  try {
    const types = await ComplainType.all()
    res.status(200).json(types)
  } catch (error) {
    errorsHandler(res, error)
  }
}
