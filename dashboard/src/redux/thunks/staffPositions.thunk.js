import {createAsyncThunk} from '@reduxjs/toolkit'
import {staffPositionsAPI} from '../../api/api'

export const fetchAllPositions = createAsyncThunk(
  'staffPositions/fetchAllPositions',
  async (_, {rejectWithValue}) => {
    try {
      return await staffPositionsAPI.getAll();
    } catch (e) {
      return rejectWithValue({status: e.status})
    }
  }
)