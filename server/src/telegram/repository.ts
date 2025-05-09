import models from '../models';
import { CustomError } from '../utils/customError';

const { Employee } = models;

export const getRegisteredEmployee = async (telegramId: any) => {
  const employee = await Employee.findOne({ where: { telegramId }, raw: true })

  return employee
}

export const registrationEmployee = async (tgContact: any) => {
  const candidate = await Employee.findOne({
    where: { phone: tgContact.phone_number },
    raw: true
  })

  if (!candidate) throw new CustomError('Сотрудник не найден')
  if (candidate.telegramId)
    throw new CustomError(
      'Сотрудник уже зарегистрирован. Если это не вы, обратитесь к администратору'
    )

  await Employee.update(
    { telegramId: tgContact.user_id },
    { where: { id: candidate.id }, limit: 1 }
  )

  return candidate
}
