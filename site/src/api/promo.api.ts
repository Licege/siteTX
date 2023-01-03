import request from '../lib/request';
import { baseUrl } from './config';

export const promoAPI = {
  getPromos() {
    return request.get(`${baseUrl}/promos/`)
      .then(payload => payload)
  },
  getPromoById(id: string) {
    return request.get(`${baseUrl}/promos/${id}`)
      .then(payload => payload)
  },
}