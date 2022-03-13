import {createSlice} from '@reduxjs/toolkit'
import {createNewNews, requestAllNews, requestNewsById, updateNews, deleteNews} from '../thunks/news.thunks'

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    news: [],
    totalCount: 0,
    currentNews: null,
    isFetching: false,
  },
  reducers: {},
  extraReducers: {
    [createNewNews.fulfilled]: (state, action) => {
      state.news.push(action.payload)
    },
    [requestAllNews.fulfilled]: (state, action) => {
      state.news = action.payload.news
      state.totalCount = action.payload.totalCount
    },
    [requestNewsById.pending]: state => {
      state.isFetching = true
    },
    [requestNewsById.fulfilled]: (state, action) => {
      state.currentNews = action.payload
      state.isFetching = false
    },
    [requestNewsById.rejected]: state => {
      state.isFetching = false
    },
    [updateNews.fulfilled]: (state, action) => {
      state.news = state.news.map(n => (n.id === action.currentNews.id ? action.currentNews : n))
    },
    [deleteNews.fulfilled]: (state, action) => {
      state.news = state.news.filter(n => n.id !== action.payload.id)
    }
  }
})

export default newsSlice.reducer
