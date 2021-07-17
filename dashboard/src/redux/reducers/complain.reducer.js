import { createSlice } from "@reduxjs/toolkit"
import { fetchComplains } from  '../thunks/complain.thunks'

const complainSlice = createSlice({
  name: 'complains',
  initialState: {
    complains: []
  },
  reducers: {},
  extraReducers: {
    [fetchComplains.fulfilled]: (state, action) => {
      state.complains = action.payload
    }
  }
})

export default complainSlice.reducer