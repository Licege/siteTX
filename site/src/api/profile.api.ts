import request from '../lib/request';
import { baseUrl } from './config';

export const profileAPI = {
  getMe() {
    // return fetch(`${apiURL}/public/me`, { credentials: 'include', method: 'GET' }).then(res => res.json()).then(res => res)
    return request.get(`${baseUrl}/me`)
      .then(payload => payload)
      .catch(reason => console.error(reason))
    // return fetch(`${apiURL}/public/me`, {
    //     credentials: 'include',
    //     method: 'GET'
    // }).then(res => res.json()).then(res => {
    //     console.log(res)
    //     return res
    // })
  },
  getOrdersHistory() {
    return request.get(`${baseUrl}/me/orders`)
      .then(payload => payload)
      .catch(reason => console.error(reason))
  }
}