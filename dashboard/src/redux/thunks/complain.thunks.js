import {createAsyncThunk} from '@reduxjs/toolkit'
import {complainAPI} from '../../api/api'

export const fetchComplains = createAsyncThunk(
  'complain/fetchComplains',
  async (params, {rejectWithValue}) => {
    try {
      return await complainAPI.getComplains(params)
    } catch (e) {
      return rejectWithValue({status: e.status})
    }
  }
)