import { IReview } from '../../types/types';

export type ActionsTypes = any

export const actions = {
    getReviews: (reviews: Array<IReview>) => ({ type: 'REVIEWS/GET_REVIEWS', reviews } as const),
    postReview: (review: IReview) => ({ type: 'REVIEWS/POST_REVIEW', review } as const),
}