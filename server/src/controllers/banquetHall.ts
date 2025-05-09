import BanquetHallRepo from '../repositories/banquetHall';
import { errorHandler } from '../utils';


export const getAll = async function (req: any, res: any) {
  try {
    const halls = await BanquetHallRepo.all({})
    res.status(200).json(halls)
  } catch (e) {
    errorHandler(res, e)
  }
}

export const get = async function (req: any, res: any) {
  try {
    const { id } = req.params

    const hall = await BanquetHallRepo.one(id)
    res.status(200).json(hall)
  } catch (e) {
    errorHandler(res, e)
  }
}

export const create = async function (req: any, res: any) {
  try {
    // const hall = await new BanquetHall({
    //     title: req.body.title,
    //     description: req.body.description,
    //     phone: req.body.phone,
    //     capacity: req.body.capacity,
    // })
  } catch (e) {
    errorHandler(res, e)
  }
}
