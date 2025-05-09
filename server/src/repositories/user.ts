import models from '../models';
import createBasicMethods from '../lib/factories/modelFactory';

const { User: UserModel } = models;

export default createBasicMethods(UserModel)
