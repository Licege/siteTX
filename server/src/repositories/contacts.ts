import models from '../models';
import createBasicMethods from '../lib/factories/modelFactory';

const { Contacts: ContactModel } = models;

export default createBasicMethods(ContactModel)
