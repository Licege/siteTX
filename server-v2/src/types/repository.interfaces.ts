import { Transaction } from 'sequelize';
export { FindOptions } from 'sequelize';

export interface RepositoryOptions {
  transaction?: Transaction;
}
