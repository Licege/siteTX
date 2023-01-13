import models from '../models';
import UserRepo from '../repositories/user';
import { errorHandler } from '../utils';

const { sequelize } = models;

export const getAll = async function (req: any, res: any) {
  const where: any = {}
  if (req.query.surname) {
    where.surname = new RegExp('^' + req.query.surname + '$', 'i')
  }

  if (req.query.forename) {
    where.forename = new RegExp('^' + req.query.forename + '$', 'i')
  }

  if (req.query.email) {
    where.email = req.query.email
  }

  if (req.query.ageStart) {
    where.age = {
      $gte: req.query.ageStart
    }
  }

  if (req.query.ageEnd) {
    if (!req.query.ageStart) {
      where.age = {}
    }
    where.age['$lte'] = req.query.ageEnd
  }

  if (req.query.phone) {
    where.phone = req.query.phone
  }

  try {
    const users = await UserRepo.all(where)
    const totalCount = users.length
    res.status(200).json({ users, totalCount })
  } catch (e) {
    errorHandler(res, e)
  }
}

export const getById = async function (req: any, res: any) {
  try {
    const user = await UserRepo.findById(req.params.id)
    res.status(200).json(user)
  } catch (e) {
    errorHandler(res, e)
  }
}

export const update = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()

  const userToUpdate: any = {
    password: req.body.password,
    surname: req.body.surname,
    forename: req.body.forename,
    patronymic: req.body.patronymic,
    phone: req.body.phone,
    birthday: req.body.birthday
  }

  if (req.file) {
    userToUpdate.imageSrc = req.file.path
  }

  try {
    const where = { id: req.params.id }

    const user = await UserRepo.update(where, userToUpdate, transaction)
    await transaction.commit()
    res.status(200).json(user)
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}
