import { AppStateType } from '../redux-store'

export const getReviewsSelector = (state: AppStateType) => {
    return state.reviewsPage.reviews
}
