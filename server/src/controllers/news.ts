import models from '../models';
import NewsRepo from '../repositories/news';
import { errorHandler } from '../utils';

const { sequelize } = models;

export const getAll = async function (req: any, res: any) {
  try {
    const news = await NewsRepo.all({})
    const totalCount = await NewsRepo.total({})
    res.status(200).json({
      news,
      totalCount
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

export const getById = async function (req: any, res: any) {
  try {
    const news = await NewsRepo.findById(req.params.id)
    res.status(200).json(news)
  } catch (e) {
    errorHandler(res, e)
  }
}

export const create = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()
  const newsToAdd = {
    title: req.body.title,
    description: req.body.description,
    shortDescription: req.body.shortDescription,
    imageSrc: req.file ? req.file.path : ''
  }

  try {
    const news = await NewsRepo.create(newsToAdd, transaction)
    await transaction.commit()
    res.status(201).json(news)
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}

export const update = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()
  const newsToUpdate: any = {
    title: req.body.title,
    description: req.body.description,
    shortDescription: req.body.shortDescription
  }

  if (req.file) {
    newsToUpdate.imageSrc = req.file.path
  }

  const id = req.params.id
  const where = { id }

  try {
    await NewsRepo.update(where, newsToUpdate, transaction)
    await transaction.commit()
    const news = await NewsRepo.findById(id)
    res.status(200).json(news)
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}

export const destroy = async function (req: any, res: any) {
  const { id } = req.params
  const transaction = await sequelize.transaction()

  try {
    await NewsRepo.destroyById(id, transaction)
    await transaction.commit()
    res.status(200).json({ id: +id })
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}
