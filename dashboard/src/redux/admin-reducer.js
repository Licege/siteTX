import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {adminAPI} from '../api/api'

export const fetchAllAdmins = createAsyncThunk(
  'admins/fetchAllAdmins',
  async () => {
    const response = await adminAPI.getAdmins()
    return response.data
  }
)

export const postAdmin = createAsyncThunk(
  'admins/postAdmin',
  async (profile) => {
    const response = await adminAPI.postAdmin(profile.id)
    return response.data
  }
)

const adminSlice = createSlice({
  name: 'admins',
  initialState: {
    admins: []
  },
  extraReducers: {
    [fetchAllAdmins.fulfilled]: (state, action) => {
      state.admins = action.payload
    },
    [postAdmin.fulfilled]: (state, action) => {
      state.admins.push(action.payload)
    }
  }
})

export default adminSlice.reducer
