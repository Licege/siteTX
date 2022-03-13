import {reviewsAPI} from '../api/api'

const GET_REVIEWS = 'REVIEWS/GET_REVIEWS'
const GET_REVIEW_BY_ID = 'REVIEWS/GET_REVIEW_BY_ID'
const CHANGE_REVIEW_STATUS = 'REVIEW/CHANGE_REVIEW_STATUS'
const POST_ANSWER = 'REVIEWS/POST_ANSWER'
const DELETE_ANSWER = 'REVIEWS/DELETE_ANSWER'

let initialState = {
  reviews: [],
  currentReview: {},
  answer: {},
}

const reviewsReducer = ( state = initialState, action ) => {
  switch (action.type) {
  case GET_REVIEWS:
    return {...state, reviews: action.reviews}
  case GET_REVIEW_BY_ID:
    return {...state, currentReview: action.review}
  case CHANGE_REVIEW_STATUS:
    return {
      ...state,
      reviews: state.reviews.map(review => review.id === action.review.id ? action.review : review),
    }
  case POST_ANSWER:
    return
  case DELETE_ANSWER:
    return
  default:
    return state
  }
}

const getReviewsAC = ( reviews ) => ({type: GET_REVIEWS, reviews})
const getReviewByIdAC = ( review ) => ({type: GET_REVIEW_BY_ID, review})
const changeReviewStatusAC = ( review ) => ({type: CHANGE_REVIEW_STATUS, review})

export const requestReviews = () => async ( dispatch ) => {
  let response = await reviewsAPI.getReviews()
  dispatch(getReviewsAC(response.data))
}

export const requestReview = ( id ) => async ( dispatch ) => {
  let response = await reviewsAPI.getReview(id)
  dispatch(getReviewByIdAC(response.data))
}

export const changeReviewStatus = ( review ) => async ( dispatch ) => {
  let response = await reviewsAPI.updateReview(review)
  dispatch(changeReviewStatusAC(response.data))
}

export default reviewsReducer
