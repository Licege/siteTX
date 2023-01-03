import request from '../lib/request';
import { complainType } from '../types/types';
import { baseUrl } from './config';

export const complainAPI = {
  getComplainTypes() {
    return request.get(`${baseUrl}/complain-types`)
      .then(payload => payload)
      .catch(reason => console.error(reason))
  },
  async postComplainPrivate(complain: complainType) {
    return request.post(`${baseUrl}/complain`, complain)
  },
  postComplainPublic(complain: complainType) {
    return request.post(`${baseUrl}/complain`, complain)
      .then(payload => payload)
      .catch(reason => console.error(reason))
  }
}