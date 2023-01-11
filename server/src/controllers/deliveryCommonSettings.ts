// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sequelize'... Remove this comment to see the full error message
const { sequelize } = require('../models').init()
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const CommonDeliveryRepo = require('../repositories/deliveryCommonSettings')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'errorHandl... Remove this comment to see the full error message
const errorHandler = require('../utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getAll = async function (req: any, res: any) {
  try {
    const settings = await CommonDeliveryRepo.all({})
    res.status(200).json(settings)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getById = async function (req: any, res: any) {
  try {
    const settings = await CommonDeliveryRepo.findById(req.params.id)
    res.status(200).json(settings)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.create = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()

  try {
    const settings = await CommonDeliveryRepo.create(req.body, transaction)
    await transaction.commit()
    res.status(200).json(settings)
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.update = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()

  try {
    const where = { id: req.params.id }
    await CommonDeliveryRepo.update(where, req.body, transaction)
    await transaction.commit()

    const settings = await CommonDeliveryRepo.findById(req.params.id)
    res.status(200).json(settings)
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}
