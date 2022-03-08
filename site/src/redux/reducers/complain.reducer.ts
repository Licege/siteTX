import { createSlice } from '@reduxjs/toolkit';
import { requestComplainTypes, requestComplain } from '../thunks/complain.thunk';
import { complainTypeType } from '../../types/types';
import { successSendCase, rejectSendCase } from '../../useCases/complain/send'

const complainSlice = createSlice({
  name: 'complain',
  initialState: {
    complainTypes: [] as complainTypeType[],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(requestComplainTypes.fulfilled, (state, action) => {
      state.complainTypes = action.payload
    })
    builder.addCase(requestComplainTypes.pending, () => {
      console.log('pending')
    })
    builder.addCase(requestComplain.fulfilled, () => {
      successSendCase()
    })
    builder.addCase(requestComplain.rejected, () => {
      rejectSendCase()
    })
  }
})

export default complainSlice.reducer