import {createAsyncThunk} from '@reduxjs/toolkit'
import {promoAPI} from '../../api/api'

export const requestAllPromos = createAsyncThunk(
  'promos/fetchAllPromos',
  async (_, {rejectWithValue}) => {
    try {
      return await promoAPI.getPromos()
    } catch (e) {
      return rejectWithValue({status: e.status})
    }
  }
)

export const requestPromoById = createAsyncThunk(
  'promos/fetchPromoById',
  async (id, {rejectWithValue}) => {
    try {
      return await promoAPI.getPromo(id)
    } catch (e) {
      return rejectWithValue({status: e.status})
    }
  }
)

export const postPromo = createAsyncThunk(
  'promos/createPromo',
  async (promo, {rejectWithValue}) => {
    try {
      return await promoAPI.postPromo(promo)
    } catch (e) {
      return rejectWithValue({status: e.status})
    }
  }
)

export const updatePromo = createAsyncThunk(
  'promos/updatePromo',
  async ({id, promo}, {rejectWithValue}) => {
    try {
      return await promoAPI.updatePromo(promo, id)
    } catch (e) {
      return rejectWithValue({status: e.status})
    }
  }
)

export const removePromo = createAsyncThunk(
  'promos/removePromo',
  async (id, {rejectWithValue}) => {
    try {
      return await promoAPI.removePromo(id)
    } catch (e) {
      return rejectWithValue({status: e.status})
    }
  }
)