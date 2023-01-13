import models from '../models';
import createBasicMethods from '../lib/factories/modelFactory';

const { GlobalSettings: GlobalDeliveryModel } = models;

export default createBasicMethods(GlobalDeliveryModel)