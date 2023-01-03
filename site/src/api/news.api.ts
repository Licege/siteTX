import request from '../lib/request';
import { baseUrl } from './config';

export const newsAPI = {
  getNews(page = 1) {
    return request.get(`${baseUrl}/news/?page=${page}`)
      .then(payload => payload)
      .catch(reason => console.error(reason))
  },
  getNewsById(id: string) {
    return request.get(`${baseUrl}/news/${id}`)
      .then(payload => payload)
      .catch(reason => console.error(reason))
  },
}