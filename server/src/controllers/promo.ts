import models from '../models';
import PromosRepo from '../repositories/promo';
import { errorHandler } from '../utils';

const { sequelize } = models;

export const getAll = async function (req: any, res: any) {
  try {
    const where: any = {}
    if (req.query.status) {
      where.status = req.query.status
    }
    const promos = await PromosRepo.all(where)
    res.status(200).json(promos)
  } catch (e) {
    errorHandler(res, e)
  }
}

export const getById = async function (req: any, res: any) {
  try {
    const promo = await PromosRepo.findById(req.params.id)
    res.status(200).json(promo)
  } catch (e) {
    errorHandler(res, e)
  }
}

export const create = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()

  const promoToCreate = {
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    description: req.body.description,
    status: req.body.status,
    imageSrc: req.file ? req.file.path : ''
  }
  try {
    const promo = await PromosRepo.create(promoToCreate, transaction)
    await transaction.commit()
    res.status(201).json(promo)
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}

export const update = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()

  const promoToUpdate: any = {
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    description: req.body.description,
    status: req.body.status
  }

  if (req.file) {
    promoToUpdate.imageSrc = req.file
  }

  const id = req.params.id
  const where = { id }
  try {
    await PromosRepo.update(where, promoToUpdate, transaction)
    await transaction.commit()
    const promo = await PromosRepo.findById(id)
    res.status(200).json(promo)
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}

export const remove = async (req: any, res: any) => {
  const { id } = req.params

  await PromosRepo.destroyById(id)
  res.status(200).json({ id: +id })
}
