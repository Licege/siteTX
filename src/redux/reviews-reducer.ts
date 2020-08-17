import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { IReview } from '../types/types'
import { reviewsAPI } from '../api/api'
import { AppStateType, InferActionsTypes } from './redux-store'


let initialState = {
    reviews: [] as Array<IReview>,
}

const reviewsReducer = ( state = initialState, action: ActionsTypes ) => {
    switch (action.type) {
        case 'REVIEWS/GET_REVIEWS':
            return { ...state, reviews: action.reviews }
        case 'REVIEWS/POST_REVIEW':
            return { ...state }
        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

const actions = {
    getReviews: ( reviews: Array<IReview> ) => ({ type: 'REVIEWS/GET_REVIEWS', reviews } as const),
    postReview: ( review: IReview ) => ({ type: 'REVIEWS/POST_REVIEW', review } as const),
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestReviews = (): ThunkType => {
    return async ( dispatch: Dispatch<ActionsTypes> ) => {
        let response = await reviewsAPI.getReviews()
        dispatch(actions.getReviews(response.data))
    }
}

export const postReview = ( review: IReview ): ThunkType => {
    return async ( dispatch: Dispatch<ActionsTypes> ) => {
        await reviewsAPI.postReview(review)
        dispatch(actions.postReview(review))
    }
}

export default reviewsReducer
