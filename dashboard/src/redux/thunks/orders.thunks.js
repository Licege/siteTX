import { createAsyncThunk } from '@reduxjs/toolkit'
import {ordersAPI} from '../../api/api'

export const requestAllOrders = createAsyncThunk(
  'orders/fetchAllOrders',
  async () => {
    const response = await ordersAPI.getOrders()
    return response
  }
)