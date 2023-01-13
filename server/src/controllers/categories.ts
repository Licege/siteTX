import models from '../models';
import CategoryRepo from '../repositories/category';
import errorHandler from '../utils/errorHandler';

const { sequelize } = models;

export const getAll = async function (req: any, res: any) {
  try {
    const categories = await CategoryRepo.all({})
    res.status(200).json(categories)
  } catch (e) {
    errorHandler(res, e)
  }
}

export const get = async function (req: any, res: any) {
  try {
    const category = await CategoryRepo.findById(req.params.id)
    res.status(200).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}

export const remove = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()

  try {
    await CategoryRepo.destroyById(req.params.id)
    await transaction.commit()
    res.status(200).json({
      message: 'Категория успешно удалена.'
    })
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}

export const create = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()

  try {
    const categoryToAdd = {
      title: req.body.title,
      titleEn: req.body.titleEn
    }

    const category = await CategoryRepo.create(categoryToAdd, transaction)
    await transaction.commit()
    res.status(200).json(category)
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}

export const update = async function (req: any, res: any) {
  const { id } = req.params
  try {
    const where = { id }
    await CategoryRepo.update(where, req.body)

    const category = await CategoryRepo.findById(id)
    res.status(200).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}
