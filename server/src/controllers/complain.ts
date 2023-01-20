import models from '../models';
import ComplainRepo from '../repositories/complain';
import { errorHandler } from '../utils';

const { sequelize } = models;

function withSort() {}

export const getAll = async function (req: any, res: any) {
  try {
    const { limit = 20, page = 1 } = req.body.pagination
    const complains = await ComplainRepo.all(
      {},
      { limit, offset: limit * (page - 1), order: [['createdAt', 'DESC']] }
    )
    const total = await ComplainRepo.total({})

    res.status(200).json({ data: complains, total })
  } catch (error) {
    errorHandler(res, error)
  }
}

export const get = async function (req: any, res: any) {
  try {
    const { id } = req.params
    const complain = await ComplainRepo.findById(id)

    res.status(200).json(complain)
  } catch (error) {
    errorHandler(res, error)
  }
}

export const create = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()

  try {
    const { typeId, name, email, phone, visitDate, text } = req.body

    const complainToAdd = {
      typeId,
      userId: req.user?.id,
      name,
      email,
      phone,
      visitDate,
      text
    }

    if (!phone)
      return res
        .status(409)
        .json({ success: false, msg: 'Phone can not be empty' })

    const complain = await ComplainRepo.create(complainToAdd, transaction)
    await transaction.commit()
    res.status(200).json(complain)
  } catch (error) {
    await transaction.rollback()
    errorHandler(res, error)
  }
}

export const update = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()

  try {
    const { id } = req.params

    const { typeId, userId, name, email, phone, visitDate, text } = req.body

    const complainToUpdate = {
      typeId,
      userId,
      name,
      email,
      phone,
      visitDate,
      text
    }

    await ComplainRepo.update({ id }, complainToUpdate, transaction)
    await transaction.commit()

    const complain = await ComplainRepo.findById(id)

    res.status(200).json(complain)
  } catch (error) {
    await transaction.rollback()
    errorHandler(res, error)
  }
}

export const remove = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()

  try {
    const { id } = req.params

    await ComplainRepo.destroyById(id, transaction)
    await transaction.commit()

    res.status(204).json('Запись успешно удалена.')
  } catch (error) {
    await transaction.rollback()
    errorHandler(res, error)
  }
}
