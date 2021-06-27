import { createSlice, createAction } from '@reduxjs/toolkit';
import { requestMe, requestOrdersHistory } from '../thunks/profile.thunks';
import { profileType } from '../../types/types';

export const clearProfile = createAction('PROFILE/CLEAR')

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    me: {} as profileType,
    ordersHistory: [] as any
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(requestMe.fulfilled, (state, action) => { state.me = action.payload })
    builder.addCase(requestOrdersHistory.fulfilled, (state, action) => { state.ordersHistory = action.payload })
    builder.addCase(clearProfile, state => {
      state.me = {} as profileType
      state.ordersHistory = []
    })
  }
})

export default profileSlice.reducer