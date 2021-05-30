import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fileAPI } from '../api/api'

export const uploadFile = createAsyncThunk(
  'files/uploadFile',
  async (file) => {
      const response = await fileAPI.uploadFile(file);
      return response.data;
  }
)

const fileSlice = createSlice({
    name: 'files',
    initialState: {
        buffer: {},
        loading: false,
        error: {},
    },
    reducers: {},
    extraReducers: {
        [uploadFile.pending]: state => {
            state.loading = true
        },
        [uploadFile.fulfilled]: (state, action) => {
            delete state.error[action.payload.file.fieldName]
            state.buffer = {
                id: action.payload.file.id,
                preview: action.payload.file.preview,
                fieldName: action.payload.file.fieldName,
                type: action.payload.data.type,
            }
            state.loading = false
        },
        [uploadFile.rejected]: (state, action) => {
            state.error[action.payload.fieldName] = 'error'
            state.loading = false
        }
    }
})

export default fileSlice.reducer

