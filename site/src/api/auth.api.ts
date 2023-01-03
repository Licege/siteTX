import { authProfileType } from '../types/types';
import request from '../lib/request';
import { authUrl } from './config';

export const authAPI = {
  login(profile: authProfileType) {
    return request.post(`${authUrl}/login/`, profile)
      .then(payload => payload)
      .catch(reason => console.error(reason))
  },
  logout() {
    return request.get(`${authUrl}/logout/`)
      .then(payload => payload)
      .catch(reason => console.error(reason))
  },
  registration(profile: authProfileType) {
    return request.post(`${authUrl}/registration/`, profile)
      .then(payload => payload)
      .catch(reason => console.error(reason))
  },
  refresh() {
    console.log('delete this method');
    return {}
  },
}