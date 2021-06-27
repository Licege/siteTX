import { createSlice } from '@reduxjs/toolkit';
import { newsType } from '../../types/types'
import { requestCurrentNews, requestNews } from '../thunks/news.thunk';

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    currentNews: {} as newsType,
    news: [] as Array<newsType>,
    totalCount: 0,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(requestNews.fulfilled, (state, action) => {
      state.news = action.payload.news
      state.totalCount = action.payload.total_count
    })
    builder.addCase(requestCurrentNews.fulfilled, (state, action) => {
      state.currentNews = action.payload
    })
  }
})

export default newsSlice.reducer