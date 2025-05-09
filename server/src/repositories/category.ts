import models from '../models';
import createBasicMethods from '../lib/factories/modelFactory';

const { Category: CategoryModel } = models;

export default createBasicMethods(CategoryModel)
