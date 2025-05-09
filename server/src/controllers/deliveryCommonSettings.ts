import models from '../models';
import CommonDeliveryRepo from '../repositories/deliveryCommonSettings';
import { errorHandler } from '../utils';

const { sequelize } = models;

export const getAll = async function (req: any, res: any) {
  try {
    const settings = await CommonDeliveryRepo.all({})
    res.status(200).json(settings)
  } catch (e) {
    errorHandler(res, e)
  }
}

export const getById = async function (req: any, res: any) {
  try {
    const settings = await CommonDeliveryRepo.findById(req.params.id)
    res.status(200).json(settings)
  } catch (e) {
    errorHandler(res, e)
  }
}

export const create = async function (req: any, res: any) {
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

export const update = async function (req: any, res: any) {
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
