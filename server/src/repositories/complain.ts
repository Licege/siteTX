import models from '../models';
import createBasicMethods from '../lib/factories/modelFactory';

const { Complain: ComplainModel } = models;

export default createBasicMethods(ComplainModel)
