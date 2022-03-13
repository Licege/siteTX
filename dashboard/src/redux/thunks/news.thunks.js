import {createAsyncThunk} from '@reduxjs/toolkit'
import {newsAPI} from '../../api/api'

export const createNewNews = createAsyncThunk(
  'news/postNews',
  async (news, {rejectWithValue}) => {
    try {
      return await newsAPI.postNews(news)
    } catch (e) {
      return rejectWithValue({status: e.status})
    }
  }
)

export const requestAllNews = createAsyncThunk(
  'news/fetchAllNews',
  async (_, {rejectWithValue}) => {
    try {
      return await newsAPI.getNews()
    } catch (e) {
      return rejectWithValue({status: e.status})
    }
  }
)

export const requestNewsById = createAsyncThunk(
  'news/getNewsById',
  async (id, {rejectWithValue}) => {
    try {
      return await newsAPI.getCurrentNews(id)
    } catch (e) {
      return rejectWithValue({status: e.status})
    }
  }
)

export const updateNews = createAsyncThunk(
  'news/updateNews',
  async ({id, data}, {rejectWithValue}) => {
    try {
      return await newsAPI.updateNews(data, id)
    } catch (e) {
      return rejectWithValue({status: e.status})
    }
  }
)

export const deleteNews = createAsyncThunk(
  'news/deleteNews',
  async (id, {rejectWithValue}) => {
    try {
      return await newsAPI.deleteNews(id)
    } catch (e) {
      return rejectWithValue({status: e.status})
    }
  }
)