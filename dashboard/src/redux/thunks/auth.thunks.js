import { createAsyncThunk } from '@reduxjs/toolkit'
import {authAPI, contactsAPI} from '../../api/api'

export const registration = createAsyncThunk(
  'auth/registration',
  async (user) => {
    const response = await authAPI.registration(user)
    return response
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (user) => {
    const response = await authAPI.login(user)
    return response.data
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    const response = await authAPI.logout()
    return response.data
  }
)