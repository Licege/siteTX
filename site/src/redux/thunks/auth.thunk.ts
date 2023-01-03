import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../../api';
import { authProfileType } from '../../types/types';
import { clearProfile } from '../reducers/profile.reducer';

export const registration = createAsyncThunk(
  'auth/registration',
  async (profile: authProfileType) => authAPI.registration(profile)
)

export const login = createAsyncThunk(
  'auth/login',
  async (profile: authProfileType) => authAPI.login(profile)
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (arg, thunkAPI) => {
    thunkAPI.dispatch(clearProfile)
    await authAPI.logout()
    // @ts-ignore
    window.location = 'https://google.com/'
  }
)