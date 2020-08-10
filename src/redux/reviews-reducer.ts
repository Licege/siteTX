import { IReview } from '../types/types'
import { reviewsAPI } from '../api/api'
import { Dispatch } from 'redux'

const GET_REVIEWS = 'REVIEWS/GET_REVIEWS'
const POST_REVIEW = 'REVIEWS/POST_REVIEW'

let initialState = {
    reviews: [] as Array<IReview>,
}

const reviewsReducer = ( state = initialState, action: ActionType ) => {
    switch (action.type) {
        case GET_REVIEWS:
            return { ...state, reviews: action.reviews }
        case POST_REVIEW:
            return { ...state }
        default:
            return state
    }
}

type getReviewsACType = {
    type: typeof GET_REVIEWS
    reviews: Array<IReview>
}

type postReviewACType = {
    type: typeof POST_REVIEW
    review: IReview
}

type ActionType = getReviewsACType | postReviewACType

const getReviewsAC = ( reviews: Array<IReview> ): getReviewsACType => ({ type: GET_REVIEWS, reviews })
const postReviewAC = ( review: IReview ): postReviewACType => ({ type: POST_REVIEW, review })

export const requestReviews = () => async ( dispatch: Dispatch<ActionType> ) => {
    let response = await reviewsAPI.getReviews()
    dispatch(getReviewsAC(response.data))
}

export const postReview = ( review: IReview ) => async ( dispatch: Dispatch<ActionType> ) => {
    await reviewsAPI.postReview(review)
    dispatch(postReviewAC(review))
}

export default reviewsReducer
