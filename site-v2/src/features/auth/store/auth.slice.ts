import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../../../entities/auth';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

// eslint-disable-next-line no-unused-vars
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: ((builder) => {
    builder.addMatcher(authApi.endpoints.login.matchPending, (state, action) => {
      console.log('pending', action);
    });
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
      state.token = action.payload.accessToken;
      state.isAuthenticated = action.payload.isAuthenticated;
    });
  })
});