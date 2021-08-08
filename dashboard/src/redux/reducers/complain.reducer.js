import { createSlice } from "@reduxjs/toolkit"
import { fetchComplains } from  '../thunks/complain.thunks'

const complainSlice = createSlice({
  name: 'complains',
  initialState: {
    complains: [],
    totalCount: 0
  },
  reducers: {},
  extraReducers: {
    [fetchComplains.fulfilled]: (state, action) => {
      state.totalCount = action.payload.total
      state.complains = action.payload.data
    }
  }
})

export default complainSlice.reducer