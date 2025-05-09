import models from '../models';
import createBasicMethods from '../lib/factories/modelFactory';

const { Gallery: GalleryModel } = models;

export default createBasicMethods(GalleryModel)
