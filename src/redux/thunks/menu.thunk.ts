import { createAsyncThunk } from "@reduxjs/toolkit";
import { menuAPI } from '../../api/api';

export const requestCategories = createAsyncThunk(
  'dishes/fetchAllCategories',
  async () => {
      return await menuAPI.getCategories()
  }
)

export const requestDishes = createAsyncThunk(
  'dishes/fetchAllDishes',
  async () => {
      return await menuAPI.getMenu()
  }
)

export const requestDishesByCategoryId = createAsyncThunk(
  'dishes/fetchAllDishesByCategory',
  async (categoryId: string|number) => {
      return await menuAPI.getMenuByCategory(categoryId)
  }
)

export const requestDishById = createAsyncThunk(
  'dishes/fetchDishById',
  async (id: number) => {
      return await menuAPI.getDish(id)
  }
)

// import { ThunkAction } from 'redux-thunk';
// import { ActionsTypes, actions } from '../actions/menu.actions'
// import { AppStateType } from '../redux-store';
// import { menuAPI } from '../../api/api';
//
// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
//
// export const getCategories = (): ThunkType => {
//     return async (dispatch) => {
//         let response = await menuAPI.getCategories()
//         dispatch(actions.getCategories(response.data))
//     }
// }
//
// export const getMenu = (): ThunkType => {
//     return async (dispatch) => {
//         let response = await menuAPI.getMenu()
//         dispatch(actions.getMenu(response.data))
//     }
// }
//
// export const getMenuByCategory = (categoryId: number | string): ThunkType => {
//     return async (dispatch) => {
//         let response = await menuAPI.getMenuByCategory(categoryId)
//         if (!response.data) {
//             dispatch(actions.getMenuByCategory([]))
//         } else dispatch(actions.getMenuByCategory(response.data))
//     }
// }
//
// export const getDish = (id: number): ThunkType => {
//     return async (dispatch) => {
//         let response = await menuAPI.getDish(id)
//         dispatch(actions.getDish(response.data))
//     }
// }