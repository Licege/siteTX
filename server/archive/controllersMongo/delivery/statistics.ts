// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Delivery'.
const Delivery = require('../../modelsMongo/delivery/Delivery')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'errorHandl... Remove this comment to see the full error message
const errorHandler = require('../../src/utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.delivery = async function (req: any, res: any) {
  let query = {}

  try {
  } catch (e) {
    errorHandler(res, e)
  }
}
