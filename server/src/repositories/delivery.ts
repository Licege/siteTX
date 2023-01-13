import models from '../models';
import createBasicMethods from '../lib/factories/modelFactory';

const { Delivery: DeliveryModel } = models;

export default createBasicMethods(DeliveryModel)