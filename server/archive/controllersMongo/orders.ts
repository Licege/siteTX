// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Orders'.
const Orders = require('../modelsMongo/Orders')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'errorHandl... Remove this comment to see the full error message
const errorHandler = require('../src/utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getAll = async function (req: any, res: any) {
  const query = {}

  if (req.query.order_date_start) {
    // @ts-expect-error TS(2339): Property 'order_date' does not exist on type '{}'.
    query.order_date = {
      $gte: req.query.order_date_start
    }
  }
  if (req.query.order_date_end) {
    if (!req.query.order_date_start) {
      // @ts-expect-error TS(2339): Property 'order_date' does not exist on type '{}'.
      query.order_date = {}
    }
    // @ts-expect-error TS(2339): Property 'order_date' does not exist on type '{}'.
    query.order_date[$lte] = req.query.order_date_end
  }
  if (req.query.create_at_start) {
    // @ts-expect-error TS(2339): Property 'create_at' does not exist on type '{}'.
    query.create_at = {
      $gte: req.query.create_at_start
    }
  }
  if (req.query.create_at_end) {
    if (!req.query.create_at_start) {
      // @ts-expect-error TS(2339): Property 'create_at' does not exist on type '{}'.
      query.create_at = {}
    }
    // @ts-expect-error TS(2339): Property 'create_at' does not exist on type '{}'.
    query.create_at[$lte] = req.query.create_at_end
  }
  try {
    const orders = await Orders.find(query)
    res.status(200).json(orders)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getById = async function (req: any, res: any) {
  try {
    const order = await Orders.findOne({ _id: req.params.id })
    res.status(200).json(order)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.create = async function (req: any, res: any) {
  try {
    const order = await new Orders(req.body).save()
    res.status(201).json(order)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.update = async function (req: any, res: any) {
  try {
    const order = await Orders.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(order)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.remove = async function (req: any, res: any) {
  try {
    await Orders.remove({ _id: req.params.id })
    res.status(200).json({
      message: 'Заказ был успешно удален.'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}
