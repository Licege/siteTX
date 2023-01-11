// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sequelize'... Remove this comment to see the full error message
const { sequelize } = require('../models').init()
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const OrdersRepo = require('../repositories/orders')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'errorHandl... Remove this comment to see the full error message
const errorHandler = require('../utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getAll = async function (req: any, res: any) {
  const where = {}

  if (req.query.orderDateStart) {
    // @ts-expect-error TS(2339): Property 'orderDate' does not exist on type '{}'.
    where.orderDate = {
      $gte: req.query.orderDateStart
    }
  }
  if (req.query.orderDateEnd) {
    if (!req.query.orderDateStart) {
      // @ts-expect-error TS(2339): Property 'orderDate' does not exist on type '{}'.
      where.orderDate = {}
    }
    // @ts-expect-error TS(2339): Property 'orderDate' does not exist on type '{}'.
    where.orderDate[$lte] = req.query.orderDateEnd
  }
  if (req.query.createdAtStart) {
    // @ts-expect-error TS(2339): Property 'createdAt' does not exist on type '{}'.
    where.createdAt = {
      $gte: req.query.createdAtStart
    }
  }
  if (req.query.createdAtEnd) {
    if (!req.query.createdAtStart) {
      // @ts-expect-error TS(2339): Property 'createdAt' does not exist on type '{}'.
      where.createdAt = {}
    }
    // @ts-expect-error TS(2339): Property 'createdAt' does not exist on type '{}'.
    where.createdAt[$lte] = req.query.createdAtEnd
  }
  try {
    const orders = await OrdersRepo.all(where, {
      order: [
        ['updatedAt', 'DESC'],
        ['createdAt', 'DESC']
      ]
    })
    res.status(200).json(orders)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getById = async function (req: any, res: any) {
  try {
    const order = await OrdersRepo.findById(req.params.id)
    res.status(200).json(order)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.create = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()

  try {
    const order = await OrdersRepo.create(req.body, transaction)
    await transaction.commit()
    res.status(201).json(order)
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.update = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()
  const where = { id: req.params.id }

  try {
    const order = await OrdersRepo.update(where, req.body, transaction)
    await transaction.commit()
    res.status(200).json(order)
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.remove = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()

  try {
    await OrdersRepo.destroyById(req.params.id)
    await transaction.commit()
    res.status(200).json({
      message: 'Заказ был успешно удален.'
    })
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}
