import { createSlice } from "@reduxjs/toolkit";
import { requestReviews } from "../thunks/reviews.thunk";
import { IReview } from '../../types/types'

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: {
        reviews: [] as Array<IReview>,
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(requestReviews.fulfilled, (state, action) => { state.reviews = action.payload })
    }
})

export default reviewsSlice.reducer

// import { ActionsTypes } from '../actions/reviews.actions'
// import { IReview } from '../../types/types'
//
// let initialState = {
//     reviews: [] as Array<IReview>,
// }
//
// const reviewsReducer = (state = initialState, action: ActionsTypes) => {
//     switch (action.type) {
//         case 'REVIEWS/GET_REVIEWS':
//             return { ...state, reviews: action.reviews }
//         case 'REVIEWS/POST_REVIEW':
//             return { ...state }
//         default:
//             return state
//     }
// }
//
// export default reviewsReducer
