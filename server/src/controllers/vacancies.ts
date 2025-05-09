import models from '../models';
import VacanciesRepo from '../repositories/vacancy';
import { errorHandler } from '../utils';

const { sequelize } = models;

export const getAll = async function (req: any, res: any) {
  try {
    const vacancies = await VacanciesRepo.all(
      {},
      {
        order: [
          ['updatedAt', 'DESC'],
          ['createdAt', 'DESC']
        ]
      }
    )
    res.status(200).json(vacancies)
  } catch (e) {
    errorHandler(res, e)
  }
}

export const getById = async function (req: any, res: any) {
  try {
    const vacancy = await VacanciesRepo.findById(req.params.id)
    res.status(200).json(vacancy)
  } catch (e) {
    errorHandler(res, e)
  }
}

export const create = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()

  const vacancyToCreate = {
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    description: req.body.description,
    salaryFrom: req.body.salaryFrom,
    salaryTo: req.body.salaryTo,
    imageSrc: req.file ? req.file.path : ''
  }

  try {
    const vacancy = await VacanciesRepo.create(vacancyToCreate, transaction)
    await transaction.commit()
    res.status(200).json(vacancy)
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}

export const update = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()

  const vacancyToUpdate: any = {
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    description: req.body.description,
    salaryFrom: req.body.salaryFrom,
    salaryTo: req.body.salaryTo
  }
  if (req.file) {
    vacancyToUpdate.imageSrc = req.file.path
  }

  try {
    const where = { id: req.params.id }

    const vacancy = await VacanciesRepo.update(
      where,
      vacancyToUpdate,
      transaction
    )
    await transaction.commit()
    res.status(200).json(vacancy)
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}

export const remove = async function (req: any, res: any) {
  const { id } = req.params

  try {
    await VacanciesRepo.destroyById(id)

    res.status(200).json(+id)
  } catch (e) {
    errorHandler(res, e)
  }
}
