// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sequelize'... Remove this comment to see the full error message
const { sequelize } = require('../models').init()
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'GlobalSett... Remove this comment to see the full error message
const GlobalSettingsRepo = require('../repositories/deliveryGlobalSettings')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'errorHandl... Remove this comment to see the full error message
const errorHandler = require('../utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.get = async function (req: any, res: any) {
  try {
    const settings = await GlobalSettingsRepo.one({})
    res.status(200).json(settings)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.update = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()

  try {
    const where = { id: req.params.id }
    await GlobalSettingsRepo.update(where, req.body, transaction)
    await transaction.commit()

    const settings = await GlobalSettingsRepo.findById(req.params.id)
    res.status(200).json(settings)
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}
