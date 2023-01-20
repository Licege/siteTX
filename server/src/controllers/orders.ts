import models from '../models';
import OrdersRepo from '../repositories/orders';
import { errorHandler } from '../utils';

const { sequelize } = models;

export const getAll = async function (req: any, res: any) {
  const where: any = {}

  if (req.query.orderDateStart) {
    where.orderDate = {
      $gte: req.query.orderDateStart
    }
  }
  if (req.query.orderDateEnd) {
    if (!req.query.orderDateStart) {
      where.orderDate = {}
    }
    where.orderDate['$lte'] = req.query.orderDateEnd
  }
  if (req.query.createdAtStart) {
    where.createdAt = {
      $gte: req.query.createdAtStart
    }
  }
  if (req.query.createdAtEnd) {
    if (!req.query.createdAtStart) {
      where.createdAt = {}
    }
    where.createdAt['$lte'] = req.query.createdAtEnd
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

export const getById = async function (req: any, res: any) {
  try {
    const order = await OrdersRepo.findById(req.params.id)
    res.status(200).json(order)
  } catch (e) {
    errorHandler(res, e)
  }
}

export const create = async function (req: any, res: any) {
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

export const update = async function (req: any, res: any) {
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

export const remove = async function (req: any, res: any) {
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
