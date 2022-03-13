import {createAsyncThunk} from '@reduxjs/toolkit'
import {ordersAPI} from '../../api/api'

export const requestAllOrders = createAsyncThunk(
  'orders/fetchAllOrders',
  async (_, {rejectWithValue}) => {
    try {
      return await ordersAPI.getOrders()
    } catch (e) {
      return rejectWithValue({status: e.status})
    }
  }
)