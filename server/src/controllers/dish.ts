import path from 'path';
import models from '../models';
import DishRepo from '../repositories/dish';
import * as fileLib from '../lib/file';
import { errorHandler } from '../utils';

const { sequelize, Category } = models;

export const getAll = async function (req: any, res: any) {
  const where: any = {}

  if (req.query.category) {
    where.categoryId = req.query.category
  }
  try {
    const dishes = await DishRepo.all(where)
    res.status(200).json(dishes)
  } catch (e) {
    errorHandler(res, e)
  }
}

export const getByCategory = async function (req: any, res: any) {
  try {
    const where = { titleEn: req.params.category }
    const include = [
      {
        model: Category,
        attributes: [],
        where
      }
    ]
    const dishes = await DishRepo.all({}, { include })
    res.status(200).json(dishes)
  } catch (e) {
    errorHandler(res, e)
  }
}

export const getById = async function (req: any, res: any) {
  try {
    const dish = await DishRepo.findById(req.params.id)
    res.status(200).json(dish)
  } catch (e) {
    errorHandler(res, e)
  }
}

export const remove = async function (req: any, res: any) {
  const { id } = req.params
  const transaction = await sequelize.transaction()

  try {
    await DishRepo.destroyById(id, transaction)
    await transaction.commit()
    res.status(200).json({ id: +id })
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}

export const create = async function (req: any, res: any) {
  const { title, description, weight, cost, categoryId } = req.body
  let imageSrc: string = ''

  const destination = path.resolve(__dirname, '../../', 'uploads')

  if (req.file) {
    imageSrc = await fileLib.uploadFile(req.file, destination, {
      format: 'webp'
    }) as string
  }

  const dishToAdd = {
    title,
    description,
    weight,
    cost,
    categoryId,
    imageSrc
  }

  try {
    const dish = await DishRepo.create(dishToAdd)
    res.status(201).json(dish)
  } catch (e) {
    errorHandler(res, e)
  }
}

export const update = async function (req: any, res: any) {
  const { id } = req.params

  const destination = path.resolve(__dirname, '../../', 'uploads')

  const { title, description, weight, cost, category, is_delivery } = req.body

  const updatedData: any = {
    title,
    description,
    weight,
    cost,
    category,
    is_delivery
  }

  if (req.file) {
    updatedData.imageSrc = await fileLib.uploadFile(req.file, destination, {
      format: 'webp'
    })
  }

  const where = { id }

  try {
    await DishRepo.update(where, updatedData)
    const dish = await DishRepo.findById(id)
    res.status(200).json(dish)
  } catch (e) {
    errorHandler(res, e)
  }
}
