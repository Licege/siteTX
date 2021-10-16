const { Employee } = require('../models').init();

exports.isEmployeeRegistered = async telegramId => {
  const employee = await Employee.findOne({ where: { telegramId }, raw: true });

  return Boolean(employee);
}

exports.registrationEmployee = async tgContact => {
  const candidate = await Employee.findOne({ where: { phone: tgContact.phone_number }, raw: true });

  if (!candidate) throw new Error('Сотрудник не найден');
  if (candidate.telegramId) throw new Error('Сотрудник уже зарегистрирован. Если это не вы, обратитесь к администратору');

  await Employee.update({ telegramId: tgContact.user_id }, { where: { id: candidate.id }, limit: 1 });
}