// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Employee'.
const { Employee } = require('../models').init()
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'CustomErro... Remove this comment to see the full error message
const { CustomError } = require('../utils/customError')

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.getRegisteredEmployee = async (telegramId: any) => {
  const employee = await Employee.findOne({ where: { telegramId }, raw: true })

  return employee
}

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.registrationEmployee = async (tgContact: any) => {
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
