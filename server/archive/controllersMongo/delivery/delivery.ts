// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Delivery'.
const Delivery = require('../../modelsMongo/delivery/Delivery')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Settings'.
const Settings = require('../../modelsMongo/delivery/CommonSettings')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'GlobalSett... Remove this comment to see the full error message
const GlobalSettings = require('../../modelsMongo/delivery/GlobalSettings')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Dishes'.
const Dishes = require('../../modelsMongo/Menu')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'errorHandl... Remove this comment to see the full error message
const errorHandler = require('../../src/utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getAll = async function (req: any, res: any) {
  const query = {}

  if (req.query.phone) {
    // @ts-expect-error TS(2339): Property 'phone' does not exist on type '{}'.
    query.phone = { $regex: '.*' + req.query.phone + '.*' }
  }
  if (req.query.create_at_start) {
    // @ts-expect-error TS(2339): Property 'create_at' does not exist on type '{}'.
    query.create_at = {
      $gte: req.query.create_at_start
    }
  }
  if (req.query.create_at_end) {
    // @ts-expect-error TS(2339): Property 'create_at' does not exist on type '{}'.
    if (!query.create_at) {
      // @ts-expect-error TS(2339): Property 'create_at' does not exist on type '{}'.
      query.create_at = {}
    }
    // @ts-expect-error TS(2339): Property 'create_at' does not exist on type '{}'.
    query.create_at['$lte'] = req.query.create_at_end
  }
  if (req.query.total_price_start) {
    // @ts-expect-error TS(2339): Property 'total_price' does not exist on type '{}'... Remove this comment to see the full error message
    query.total_price = {
      $gte: req.query.total_price_start
    }
  }
  if (req.query.total_price_end) {
    if (!req.query.total_price_start) {
      // @ts-expect-error TS(2339): Property 'total_price' does not exist on type '{}'... Remove this comment to see the full error message
      query.total_price = {}
    }
    // @ts-expect-error TS(2339): Property 'total_price' does not exist on type '{}'... Remove this comment to see the full error message
    query.total_price['$lte'] = req.query.total_price_end
  }
  if (req.query.time_delivery_start) {
    // @ts-expect-error TS(2339): Property 'time_delivery' does not exist on type '{... Remove this comment to see the full error message
    query.time_delivery = {
      $gte: req.query.time_delivery_start
    }
  }
  if (req.query.time_delivery_end) {
    if (!req.query.time_delivery_start) {
      // @ts-expect-error TS(2339): Property 'time_delivery' does not exist on type '{... Remove this comment to see the full error message
      query.time_delivery = {}
    }
    // @ts-expect-error TS(2339): Property 'time_delivery' does not exist on type '{... Remove this comment to see the full error message
    query.time_delivery['$lte'] = req.query.time_delivery_end
  }
  if (req.query.payment_status) {
    // @ts-expect-error TS(2339): Property 'payment_status' does not exist on type '... Remove this comment to see the full error message
    query.payment_status = req.query.payment_status
  }
  if (req.query.delivery_status) {
    // @ts-expect-error TS(2339): Property 'delivery_status' does not exist on type ... Remove this comment to see the full error message
    query.delivery_status = req.query.delivery_status
  }
  if (req.query.payment_type) {
    // @ts-expect-error TS(2339): Property 'payment_type' does not exist on type '{}... Remove this comment to see the full error message
    query.payment_type = req.query.payment_type
  }
  if (req.query.delivery_type) {
    // @ts-expect-error TS(2339): Property 'delivery_type' does not exist on type '{... Remove this comment to see the full error message
    query.delivery_type = req.query.delivery_type
  }
  if (req.query.status) {
    // @ts-expect-error TS(2339): Property 'status' does not exist on type '{}'.
    query.status = req.query.status
  }

  try {
    const delivery = await Delivery.find(query)
      .sort({ create_at: -1 })
      .skip((+req.query.offset - 1) * 5)
      .limit(5)
    const total_count = await Delivery.find(query).countDocuments()
    res.status(200).json({ delivery, total_count })
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getById = async function (req: any, res: any) {
  try {
    const delivery = await Delivery.findOne({ _id: req.params.id })
    res.status(200).json(delivery)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.create = async function (req: any, res: any) {
  try {
    //валидация
    const globalSettings = await GlobalSettings.findOne()

    if (req.body.delivery_type === 'home') {
      const settings = await Settings.findOne({ city: req.body.address.city })
      if (!settings) {
        res.status(400).json({ message: 'Невалидные данные!' })
      } else if (
        settings.free_delivery > req.body.total_price &&
        settings.price_for_delivery !== req.body.delivery_cost
      ) {
        res.status(400).json({ message: 'Невалидные данные!' })
        return
      } else if (
        settings.free_delivery <= req.body.total_price &&
        req.body.delivery_cost !== 0
      ) {
        res.status(400).json({ message: 'Невалидные данные!' })
        return
      }
    } else if (req.body.delivery_type === 'restaurant') {
      if (req.body.sale_for_pickup !== globalSettings.sale_for_pickup) {
        res.status(400).json({ message: 'Невалидные данные!' })
        return
      }
    }

    const dishes = await Dishes.find({})
    let countItem = 0
    let totalPrice = 0
    for (let i = 0; i < req.body.list.length; i++) {
      let dish = dishes.find(
        (dish: any) => dish._id.toString() === req.body.list[i].dish_id
      )
      if (req.body.list[i].cost !== dish.cost) {
        res.status(400).json({ message: 'Невалидные данные!' })
        return
      }
      totalPrice = totalPrice + dish.cost * req.body.list[i].count
      countItem++
    }
    if (
      req.body.total_price !== totalPrice ||
      req.body.list.length !== countItem
    ) {
      res.status(400).json({ message: 'Невалидные данные!' })
      return
    }

    const delivery = await new Delivery(req.body).save()
    res.status(201).json(delivery)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.update = async function (req: any, res: any) {
  try {
    const delivery = await Delivery.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(delivery)
  } catch (e) {
    errorHandler(res, e)
  }
}
