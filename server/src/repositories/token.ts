import models from '../models';
import createBasicMethods from '../lib/factories/modelFactory';

const { Token: TokenModel } = models;

export default createBasicMethods(TokenModel);
