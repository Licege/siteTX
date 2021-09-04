import { createSlice } from '@reduxjs/toolkit'
import { fetchAllPositions } from "../thunks/staffPositions.thunk";

const staffPositionsSlice = createSlice({
  name: 'staffPositions',
  initialState: {
    positions: []
  },
  reducers: {},
  extraReducers: {
    [fetchAllPositions.fulfilled]: (state, action) => {
      state.positions = action.payload
    },
    [fetchAllPositions.rejected]: (state, action) => {
      console.log('rejected', action.payload)
    }
  }
})

export default staffPositionsSlice.reducer
