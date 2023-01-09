import request from '../lib/request';
import { IDeliveryPost } from '@/types/types';
import { baseUrl } from './config';

export const bucketAPI = {
  getDeliverySettings() {
    return request.get(`${baseUrl}/delivery-settings/common/`)
      .then(payload => payload)
      .catch(reason => console.error(reason))
  },

  getDeliveryGlobalSettings() {
    return request.get(`${baseUrl}/delivery-settings/global/`)
      .then(payload => payload)
      .catch(reason => console.error(reason))
  },

  async postOrder(order: IDeliveryPost) {
    return request.post(`${baseUrl}/delivery/`, order)
  },
}