const { Employee } = require('../models').init();

exports.isEmployeeRegistered = async telegramId => {
  const employee = await Employee.findOne({ where: { telegramId }, raw: true });

  return Boolean(employee);
}