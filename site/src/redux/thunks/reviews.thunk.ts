import { createAsyncThunk } from "@reduxjs/toolkit";
import { reviewsAPI } from '../../api/api';
import { IReview } from '../../types/types';

export const requestReviews = createAsyncThunk(
  'reviews/fetchAllReviews',
  async () => {
      return await reviewsAPI.getReviews()
  }
)

export const postReview = createAsyncThunk(
  'reviews/postNewReview',
  async (review: IReview) => {
      return await reviewsAPI.postReview(review)
  }
)

// import { ThunkAction } from 'redux-thunk';
// import { ActionsTypes, actions } from '../actions/reviews.actions'
// import { AppStateType } from '../redux-store';
// import { Dispatch } from 'redux';
// import { reviewsAPI } from '../../api/api';
// import { IReview } from '../../types/types';
//
// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
//
// export const requestReviews = (): ThunkType => {
//     return async (dispatch: Dispatch<ActionsTypes>) => {
//         let response = await reviewsAPI.getReviews()
//         dispatch(actions.getReviews(response.data))
//     }
// }
//
// export const postReview = (review: IReview): ThunkType => {
//     return async (dispatch: Dispatch<ActionsTypes>) => {
//         await reviewsAPI.postReview(review)
//         dispatch(actions.postReview(review))
//     }
// }