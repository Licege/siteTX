import models from '../models';
import createBasicMethods from '../lib/factories/modelFactory';

const { BanquetHall: BanquetHallModel } = models;

export default createBasicMethods(BanquetHallModel)