import { createAsyncThunk } from "@reduxjs/toolkit";
import { complainAPI } from '../../api/api'
import { getAuthStatus } from '../selectors/auth'
import { complainType } from '../../types/types'
import {AppStateType} from "../redux-store";

export const requestComplainTypes = createAsyncThunk(
  'complains/fetchAllComplainTypes',
  async () => {
      return await complainAPI.getComplainTypes()
  }
)

export const requestComplain = createAsyncThunk<any, complainType, { state: AppStateType }>(
  'complains/postNewComplain',
  async (complain, thunkAPI) => {
      const { getState } = thunkAPI
      const isAuthenticated = getAuthStatus(getState())
      return isAuthenticated
            ? await complainAPI.postComplainPrivate(complain)
            : await complainAPI.postComplainPublic(complain)
  }
)

// import { ThunkAction } from 'redux-thunk'
// import { ActionsTypes, actions } from '../actions/complain.actions'
// import { AppStateType } from '../redux-store'
// import { complainAPI } from '../../api/api'
// import { complainType } from '../../types/types'
// import { getAuthStatus } from '../selectors/auth'
//
// export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
//
// export const requestComplainTypes = (): ThunkType => {
//     return async (dispatch) => {
//         const response = await complainAPI.getComplainTypes()
//         dispatch(actions.getComplainTypes(response.data))
//     }
// }
//
// export const requestComplain = (complain: complainType): ThunkType => {
//     return async (dispatch, getState) => {
//         const state = await getState();
//         const isAuthenticated = getAuthStatus(state);
//         const response = isAuthenticated
//             ? await complainAPI.postComplainPrivate(complain)
//             : await complainAPI.postComplainPublic(complain)
//         dispatch(actions.postComplain(response.data))
//     }
// }