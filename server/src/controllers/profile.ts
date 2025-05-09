import models from '../models';
import UserRepo from '../repositories/user';
import DeliveryRepo from '../repositories/delivery';
import { errorHandler } from '../utils';

const { sequelize } = models;

export const getMe = async function (req: any, res: any) {
  try {
    if (!req.user) {
      res.sendStatus(401)
      return
    }

    const me = await UserRepo.findById(req.user.id)
    delete me.password
    res.status(200).json(me)
  } catch (e) {
    errorHandler(res, e)
  }
}

export const getMyOrders = async function (req: any, res: any) {
  try {
    const attributes = [
      'id',
      'name',
      'email',
      'phone',
      'address',
      'deliveryCost',
      'deliveryType',
      'paymentStatus',
      'paymentType',
      'sale',
      'price',
      'createdAt'
    ]

    console.log('userId:', req.user.id)
    const where = { userId: req.user.id }
    const deliveryOrders = await DeliveryRepo.all(where, {
      attributes,
      order: [['createdAt', 'DESC']]
    })

    res.status(200).json(deliveryOrders)
  } catch (e) {
    errorHandler(res, e)
  }
}

export const updateMe = async function (req: any, res: any) {
  const transaction = await sequelize.transaction()

  try {
    const where = { id: req.user }
    const updatedProfile = await UserRepo.update(where, req.body, transaction)
    await transaction.commit()
    return res.status(200).json(updatedProfile)
  } catch (e) {
    await transaction.rollback()
    errorHandler(res, e)
  }
}
