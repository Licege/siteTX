import { AppStateType } from '../redux-store'

export const getReviewsSelector = (state: any) => {
    return state.reviewsPage.reviews
}
