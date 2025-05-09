import models from '../models';
import createBasicMethods from '../lib/factories/modelFactory';

const { StaffPosition: StaffPositionModel } = models;

export default createBasicMethods(StaffPositionModel)