const { Employee: EmployeeModel } = require('../models').init()
const createBasicMethods = require('../lib/factories/modelFactory')

const Employee = createBasicMethods(EmployeeModel)

module.exports = {
    ...Employee
}