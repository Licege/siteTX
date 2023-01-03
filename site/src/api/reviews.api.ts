import request from '../lib/request';
import { IReview } from '../types/types';
import { baseUrl } from './config';

export const reviewsAPI = {
  getReviews() {
    return request.get(`${baseUrl}/reviews/`)
      .then(payload => payload)
      .catch(reason => console.error(reason))
  },
  postReview(review: IReview) {
    return request.post(`${baseUrl}/reviews/`, review)
      .then(payload => payload)
      .catch(reason => console.error(reason))
  },
}