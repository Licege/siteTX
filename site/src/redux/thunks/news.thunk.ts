import { createAsyncThunk } from '@reduxjs/toolkit';
import { newsAPI } from '../../api';

export const requestNews = createAsyncThunk(
  'news/fetchAllNews',
  async (page?: number) => newsAPI.getNews(page)
)

export const requestCurrentNews = createAsyncThunk(
  'news/fetchNewsById',
  async (id: string) => newsAPI.getNewsById(id)
)