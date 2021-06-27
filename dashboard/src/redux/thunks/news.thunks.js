import {createAsyncThunk} from '@reduxjs/toolkit'
import {newsAPI} from '../../api/api'

export const createNewNews = createAsyncThunk(
  'news/postNews',
  async (news) => {
    const response = await newsAPI.postNews(news)
    return response
  }
)

export const requestAllNews = createAsyncThunk(
  'news/fetchAllNews',
  async () => {
    const response = await newsAPI.getNews()
    return response
  }
)

export const requestNewsById = createAsyncThunk(
  'news/getNewsById',
  async (id) => {
    const response = await newsAPI.getCurrentNews(id)
    return response
  }
)

export const updateNews = createAsyncThunk(
  'news/updateNews',
  async ({ id, data }) => {
    const response = await newsAPI.updateNews(data, id)
    return response
  }
)

export const deleteNews = createAsyncThunk(
  'news/deleteNews',
  async (id) => {
    const response = await newsAPI.deleteNews(id)
    return response
  }
)