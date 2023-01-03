import { createAsyncThunk } from '@reduxjs/toolkit';
import { profileAPI } from '../../api';

export const requestMe = createAsyncThunk(
  'profile/fetchMe',
  async () => profileAPI.getMe()
)

export const requestOrdersHistory = createAsyncThunk(
  'profile/fetchOrderHistory',
  async () => profileAPI.getOrdersHistory()
)