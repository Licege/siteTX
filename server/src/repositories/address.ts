import models from '../models';
import createBasicMethods from '../lib/factories/modelFactory';

const { Address: AddressModel } = models;

export default createBasicMethods(AddressModel)
