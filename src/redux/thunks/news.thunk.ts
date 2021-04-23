import { createAsyncThunk } from "@reduxjs/toolkit";
import { newsAPI } from '../../api/api';

export const requestNews = createAsyncThunk(
  'news/fetchAllNews',
  async (page?: number) => {
      const response = await newsAPI.getNews(page)
      return response.data
  }
)

export const requestCurrentNews = createAsyncThunk(
  'news/fetchNewsById',
  async (id: string) => {
      const response = await newsAPI.getNewsById(id)
      return response.data
  }
)

// import { Dispatch } from 'redux';
// import { ActionsTypes, actions } from '../actions/news.actions'
// import { newsAPI } from '../../api/api';
//
// export const requestNews = (page?: number) => async (dispatch: Dispatch<ActionsTypes>) => {
//     let response = await newsAPI.getNews(page)
//     dispatch(actions.getNews(response.data.news, response.data.total_count))
// }
//
// export const requestCurrentNews = (id: string) => async (dispatch: Dispatch<ActionsTypes>) => {
//     let response = await newsAPI.getNewsById(id)
//     dispatch(actions.getCurrentNews(response.data))
// }