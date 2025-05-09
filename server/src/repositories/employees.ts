import models from '../models';
import createBasicMethods from '../lib/factories/modelFactory';

const { Employee: EmployeeModel } = models;

export default createBasicMethods(EmployeeModel)