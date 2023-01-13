import models from '../models';
import DishRepo from '../repositories/dish';
import DeliveryRepo from '../repositories/delivery';
import CommonSettingsRepo from '../repositories/deliveryCommonSettings';
import { errorHandler } from '../utils';

const { Delivery, GlobalSettings } = models;

export const getAll = async function (req: any, res: any) {
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

  const where: any = {}

  if (phone) {
    where.phone = { $regex: `.*${phone}.*` }
  }
  if (createdAtStart) {
    where.createdAt = {
      $gte: createdAtStart
    }
  }
  if (createdAtEnd) {
    if (!where.createdAt) {
      where.createdAt = {}
    }
    where.createdAt['$lte'] = createdAtEnd
  }
  if (totalPriceStart) {
    where.totalPrice = {
      $gte: totalPriceStart
    }
  }
  if (totalPriceEnd) {
    if (!totalPriceStart) {
      where.totalPrice = {}
    }
    where.totalPrice['$lte'] = totalPriceStart
  }
  if (timeDeliveryStart) {
    where.timeDelivery = {
      $gte: timeDeliveryStart
    }
  }
  if (timeDeliveryEnd) {
    if (!timeDeliveryStart) {
      where.timeDelivery = {}
    }
    where.timeDelivery['$lte'] = timeDeliveryEnd
  }
  if (paymentStatus) {
    where.paymentStatus = paymentStatus
  }
  if (deliveryStatus) {
    where.deliveryStatus = deliveryStatus
  }
  if (paymentType) {
    where.paymentType = paymentType
  }
  if (deliveryType) {
    where.deliveryType = deliveryType
  }
  if (status) {
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

export const getById = async function (req: any, res: any) {
  try {
    const delivery = await DeliveryRepo.findById(req.params.id)
    res.status(200).json(delivery)
  } catch (e) {
    errorHandler(res, e)
  }
}

export const create = async function (req: any, res: any) {
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

export const update = async function (req: any, res: any) {
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
