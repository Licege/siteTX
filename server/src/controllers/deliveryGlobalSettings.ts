import models from '../models';
import GlobalSettingsRepo from '../repositories/deliveryGlobalSettings';
import { errorHandler } from '../utils';

const { sequelize } = models;

export const get = async function (req: any, res: any) {
  try {
    const settings = await GlobalSettingsRepo.one({})
    res.status(200).json(settings)
  } catch (e) {
    errorHandler(res, e)
  }
}

export const update = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()

  try {
    const where = { id: req.params.id }
    await GlobalSettingsRepo.update(where, req.body, transaction)
    await transaction.commit()

    const settings = await GlobalSettingsRepo.findById(req.params.id)
    res.status(200).json(settings)
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}
