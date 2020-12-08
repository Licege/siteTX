import { InferActionsTypes } from '../redux-store';
import { IReview } from '../../types/types';

export type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    getReviews: (reviews: Array<IReview>) => ({ type: 'REVIEWS/GET_REVIEWS', reviews } as const),
    postReview: (review: IReview) => ({ type: 'REVIEWS/POST_REVIEW', review } as const),
}