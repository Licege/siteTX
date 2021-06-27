import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authTokenType } from '../../types/types';
import { login, logout } from '../thunks/auth.thunk';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    isAuthenticated: !!localStorage.getItem('accessToken')
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action: PayloadAction<authTokenType>) => {
      localStorage.setItem('accessToken', action.payload.accessToken)
      localStorage.setItem('refreshToken', action.payload.refreshToken)

      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.isAuthenticated = true
    })
    builder.addCase(logout.fulfilled, state => {
      localStorage.clear()
      state.isAuthenticated = false
    })
    // builder.addCase(registration.fulfilled, (state, action) => {})
  }
})

export default authSlice.reducer
