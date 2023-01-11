// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Delivery'.
const { Delivery, GlobalSettings } = require('../models').init()
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'DeliveryRe... Remove this comment to see the full error message
const DeliveryRepo = require('../repositories/delivery')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const CommonSettingsRepo = require('../repositories/deliveryCommonSettings')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'DishRepo'.
const DishRepo = require('../repositories/dish')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'errorHandl... Remove this comment to see the full error message
const errorHandler = require('../utils/errorHandler')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getAll = async function (req: any, res: any) {
  const {
    phone,
    createdAtStart,
    createdAtEnd,
    totalPriceStart,
    totalPriceEnd,
    timeDeliveryStart,
    timeDeliveryEnd,
    paymentStatus,
    paymentType,
    deliveryStatus,
    deliveryType,
    status
  } = req.query

  const where = {}

  if (phone) {
    // @ts-expect-error TS(2339): Property 'phone' does not exist on type '{}'.
    where.phone = { $regex: `.*${phone}.*` }
  }
  if (createdAtStart) {
    // @ts-expect-error TS(2339): Property 'createdAt' does not exist on type '{}'.
    where.createdAt = {
      $gte: createdAtStart
    }
  }
  if (createdAtEnd) {
    // @ts-expect-error TS(2339): Property 'createdAt' does not exist on type '{}'.
    if (!where.createdAt) {
      // @ts-expect-error TS(2339): Property 'createdAt' does not exist on type '{}'.
      where.createdAt = {}
    }
    // @ts-expect-error TS(2339): Property 'createdAt' does not exist on type '{}'.
    where.createdAt['$lte'] = createdAtEnd
  }
  if (totalPriceStart) {
    // @ts-expect-error TS(2339): Property 'totalPrice' does not exist on type '{}'.
    where.totalPrice = {
      $gte: totalPriceStart
    }
  }
  if (totalPriceEnd) {
    if (!totalPriceStart) {
      // @ts-expect-error TS(2339): Property 'totalPrice' does not exist on type '{}'.
      where.totalPrice = {}
    }
    // @ts-expect-error TS(2339): Property 'totalPrice' does not exist on type '{}'.
    where.totalPrice['$lte'] = totalPriceStart
  }
  if (timeDeliveryStart) {
    // @ts-expect-error TS(2339): Property 'timeDelivery' does not exist on type '{}... Remove this comment to see the full error message
    where.timeDelivery = {
      $gte: timeDeliveryStart
    }
  }
  if (timeDeliveryEnd) {
    if (!timeDeliveryStart) {
      // @ts-expect-error TS(2339): Property 'timeDelivery' does not exist on type '{}... Remove this comment to see the full error message
      where.timeDelivery = {}
    }
    // @ts-expect-error TS(2339): Property 'timeDelivery' does not exist on type '{}... Remove this comment to see the full error message
    where.timeDelivery['$lte'] = timeDeliveryEnd
  }
  if (paymentStatus) {
    // @ts-expect-error TS(2339): Property 'paymentStatus' does not exist on type '{... Remove this comment to see the full error message
    where.paymentStatus = paymentStatus
  }
  if (deliveryStatus) {
    // @ts-expect-error TS(2339): Property 'deliveryStatus' does not exist on type '... Remove this comment to see the full error message
    where.deliveryStatus = deliveryStatus
  }
  if (paymentType) {
    // @ts-expect-error TS(2339): Property 'paymentType' does not exist on type '{}'... Remove this comment to see the full error message
    where.paymentType = paymentType
  }
  if (deliveryType) {
    // @ts-expect-error TS(2339): Property 'deliveryType' does not exist on type '{}... Remove this comment to see the full error message
    where.deliveryType = deliveryType
  }
  if (status) {
    // @ts-expect-error TS(2339): Property 'status' does not exist on type '{}'.
    where.status = status
  }

  try {
    const deliveriesData = await Delivery.findAndCountAll({
      where,
      limit: 5,
      order: [
        ['updatedAt', 'DESC'],
        ['createdAt', 'DESC']
      ],
      raw: true
    })
    const deliveries = deliveriesData.rows
    const totalCount = deliveriesData.count.length

    res.status(200).json({ deliveries, totalCount })
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.getById = async function (req: any, res: any) {
  try {
    const delivery = await DeliveryRepo.findById(req.params.id)
    res.status(200).json(delivery)
  } catch (e) {
    errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.create = async function (req: any, res: any) {
  const {
    address,
    deliveryType,
    deliveryCost,
    totalPrice,
    saleForPickup,
    list
  } = req.body

  try {
    //валидация
    const globalSettings = await GlobalSettings.findOne()

    if (deliveryType === 'home') {
      const settings = await CommonSettingsRepo.one({ cityId: address.city })
      if (!settings) {
        return res.status(400).json({ message: 'Невалидные данные!' })
      }
      if (
        settings.freeDelivery > totalPrice &&
        settings.priceForDelivery !== deliveryCost
      ) {
        return res.status(400).json({ message: 'Невалидные данные!' })
      }
      if (settings.freeDelivery <= totalPrice && deliveryCost !== 0) {
        return res.status(400).json({ message: 'Невалидные данные!' })
      }
    } else if (deliveryType === 'restaurant') {
      if (saleForPickup !== globalSettings.saleForPickup) {
        return res.status(400).json({ message: 'Невалидные данные!' })
      }
    }

    const ids = list.map(({
      dishId
    }: any) => dishId)
    const where = { id: ids }
    const dishes = await DishRepo.all(where)

    let countItem = 0
    let calculatedTotalPrice = 0

    list.forEach((listItem: any) => {
      const dish = dishes.find((dish: any) => dish.id === listItem.dishId)
      if (listItem.cost !== dish.cost) {
        return res.status(400).json({ message: 'Невалидные данные!' })
      }
      calculatedTotalPrice += dish.cost * listItem.count
      countItem++
    })

    if (totalPrice !== calculatedTotalPrice || list.length !== countItem) {
      return res.status(400).json({ message: 'Невалидные данные!' })
    }

    const delivery = await DeliveryRepo.create(req.body)

    return res.status(201).json(delivery)
  } catch (e) {
    return errorHandler(res, e)
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports.update = async function (req: any, res: any) {
  try {
    const { id } = req.params
    const {
      address,
      comment,
      countPerson,
      deliveryCost,
      deliveryType,
      email,
      list,
      name,
      paymentStatus,
      paymentType,
      oddMoney,
      phone,
      price,
      sale,
      status,
      timeDelivery,
      userId
    } = req.body

    const newDeliveryOrder = {
      address,
      comment,
      countPerson,
      deliveryCost,
      deliveryType,
      email,
      list,
      name,
      paymentStatus,
      paymentType,
      oddMoney,
      phone,
      price,
      sale,
      status,
      timeDelivery,
      userId
    }

    await DeliveryRepo.update({ id }, newDeliveryOrder)
    const delivery = await DeliveryRepo.findById(id)
    res.status(200).json(delivery)
  } catch (e) {
    errorHandler(res, e)
  }
}
