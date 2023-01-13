import ComplainType from '../repositories/complainType';
import { errorHandler } from '../utils';

export const getAll = async function (req: any, res: any) {
  try {
    const types = await ComplainType.all()
    res.status(200).json(types)
  } catch (error) {
    errorHandler(res, error)
  }
}
