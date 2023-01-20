import models from '../models';
import createBasicMethods from '../lib/factories/modelFactory';

const { ComplainType: ComplainTypeModel } = models;

export default createBasicMethods(ComplainTypeModel)