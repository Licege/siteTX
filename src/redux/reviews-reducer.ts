import {IReview} from "../types/types";
import {reviewsAPI} from "../api/api";

const GET_REVIEWS = 'REVIEWS/GET_REVIEWS';
const POST_REVIEW = 'REVIEWS/POST_REVIEW';

let initialState = {
    reviews: [] as Array<IReview>
}

const reviewsReducer = (state = initialState, action: actionType) => {
    switch(action.type) {
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

type actionType = getReviewsACType | postReviewACType

const getReviewsAC = (reviews: Array<IReview>): getReviewsACType => ({ type: GET_REVIEWS, reviews })
const postReviewAC = (review: IReview): postReviewACType => ({ type: POST_REVIEW, review })

export const requestReviews = () => async(dispatch: any) => {
    let response = await reviewsAPI.getReviews()
    dispatch(getReviewsAC(response.data))
}

export const postReview = (review: IReview) => async(dispatch: any) => {
    let response = await reviewsAPI.postReview(review)
    dispatch(postReviewAC(review))
}

export default reviewsReducer;