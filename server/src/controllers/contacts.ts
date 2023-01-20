import models from '../models';
import ContactsRepo from '../repositories/contacts';
import { errorHandler } from '../utils';

const { sequelize } = models

export const get = async function (req: any, res: any) {
  try {
    const contacts = await ContactsRepo.one({})
    if (!contacts) return errorHandler(res, 'Контакты пусты', 409)
    res.status(200).json(contacts)
  } catch (e) {
    errorHandler(res, e)
  }
}

export const update = async function (req: any, res: any) {
  const transition = await sequelize.transaction()

  try {
    const where = { id: req.params.id }
    const contacts = await ContactsRepo.update(where, req.body, transition)
    await transition.commit()
    res.status(200).json(contacts)
  } catch (e) {
    await transition.rollback()
    errorHandler(res, e)
  }
}
