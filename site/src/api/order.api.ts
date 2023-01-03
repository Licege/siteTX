import { IOrder } from '../types/types';
import request from '../lib/request';
import { baseUrl } from './config';

export const orderAPI = {
  postOrder(order: IOrder) {
    return request.post(`${baseUrl}/orders/`, order)
      .then(payload => payload)
      .catch(reason => console.error(reason))
  },
}