import models from '../models';
import createBasicMethods from '../lib/factories/modelFactory';

const { Restaurant: RestaurantModel } = models;

export default createBasicMethods(RestaurantModel)