import request from '../lib/request';
import { baseUrl } from './config';

export const contactsAPI = {
  async getContacts() {
    return request.get(`${baseUrl}/contacts/`)
  },
}