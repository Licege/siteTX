import models from '../models';
import createBasicMethods from '../lib/factories/modelFactory';

const { Review: ReviewModel } = models;

export default createBasicMethods(ReviewModel)