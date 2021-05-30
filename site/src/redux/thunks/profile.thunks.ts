import { createAsyncThunk } from "@reduxjs/toolkit";
import { profileAPI } from '../../api/api';

export const requestMe = createAsyncThunk(
  'profile/fetchMe',
    async () => {
        return await profileAPI.getMe()
    }
  )

export const requestOrdersHistory = createAsyncThunk(
  'profile/fetchOrderHistory',
  async () => {
      return await profileAPI.getOrdersHistory()
  }
)

// import { ThunkAction } from 'redux-thunk';
// import { ActionsTypes, actions } from '../actions/profile.actions'
// import { AppStateType } from '../redux-store';
// import { Dispatch } from 'redux';
// import { profileAPI } from '../../api/api';
//
// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
//
// export const requestMe = (): ThunkType => {
//     return async (dispatch: Dispatch<ActionsTypes>) => {
//         const response = await profileAPI.getMe()
//         dispatch(actions.getMe(response.data))
//     }
// }
//
// export const requestOrdersHistory = ():ThunkType => {
//     return async (dispatch: Dispatch<ActionsTypes>) => {
//         const response = await profileAPI.getOrdersHistory()
//         dispatch(actions.getOrdersHistory(response.data))
//     }
// }