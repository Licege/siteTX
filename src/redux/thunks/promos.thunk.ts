import { createAsyncThunk } from "@reduxjs/toolkit";
import { promoAPI } from '../../api/api';

export const requestPromos = createAsyncThunk(
  'promos/fetchAllPromos',
  async () => {
      const response = await promoAPI.getPromos()
      return response.data
  }
)

export const requestPromoById = createAsyncThunk(
  'promos/fetchPromoById',
  async (id: string) => {
      const response = await promoAPI.getPromoById(id)
      return response.data
  }
)

// import { ThunkAction } from 'redux-thunk';
// import { ActionsTypes, actions } from '../actions/promos.actions'
// import { AppStateType } from '../redux-store';
// import { Dispatch } from 'redux';
// import { promoAPI } from '../../api/api';
//
// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
//
// export const requestPromos = (): ThunkType => {
//     return async (dispatch: Dispatch<ActionsTypes>) => {
//         let response = await promoAPI.getPromos()
//         dispatch(actions.getPromos(response.data))
//     }
// }
// export const requestPromoById = (id: string): ThunkType => {
//     return async (dispatch: Dispatch<ActionsTypes>) => {
//         let response = await promoAPI.getPromoById(id)
//         dispatch(actions.getPromoById(response.data))
//     }
// }