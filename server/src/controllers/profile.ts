// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sequelize'... Remove this comment to see the full error message
const { sequelize } = require('../models').init()
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'UserRepo'.
const UserRepo = require('../repositories/user')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'DeliveryRe... Remove this comment to see the full error message
const DeliveryRepo = require('../repositories/delivery')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'errorHandl... Remove this comment to see the full error message
const errorHandler = require('../utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getMe = async function (req: any, res: any) {
  try {
    if (!req.user) {
      res.sendStatus(401)
      return
    }

    const me = await UserRepo.findById(req.user.id)
    delete me.password
    res.status(200).json(me)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getMyOrders = async function (req: any, res: any) {
  try {
    const attributes = [
      'id',
      'name',
      'email',
      'phone',
      'address',
      'deliveryCost',
      'deliveryType',
      'paymentStatus',
      'paymentType',
      'sale',
      'price',
      'createdAt'
    ]

    console.log('userId:', req.user.id)
    const where = { userId: req.user.id }
    const deliveryOrders = await DeliveryRepo.all(where, {
      attributes,
      order: [['createdAt', 'DESC']]
    })

    res.status(200).json(deliveryOrders)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.updateMe = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()

  try {
    const where = { id: req.user }
    const updatedProfile = await UserRepo.update(where, req.body, transaction)
    await transaction.commit()
    return res.status(200).json(updatedProfile)
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}
