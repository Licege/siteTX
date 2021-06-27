import { AppStateType } from '../redux-store'

export const getReviewsSelector = (state: AppStateType) => state.reviewsPage.reviews
