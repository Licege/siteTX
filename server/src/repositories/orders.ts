import models from '../models';
import createBasicMethods from '../lib/factories/modelFactory';

const { Orders: OrdersModel } = models;

export default createBasicMethods(OrdersModel)