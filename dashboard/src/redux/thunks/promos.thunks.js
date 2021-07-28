import { createAsyncThunk } from '@reduxjs/toolkit'
import { promoAPI } from '../../api/api'

export const requestAllPromos = createAsyncThunk(
  'promos/fetchAllPromos',
  async () => {
    const response = await promoAPI.getPromos()
    return response
  }
)

export const requestPromoById = createAsyncThunk(
  'promos/fetchPromoById',
  async (id) => {
    const response = await promoAPI.getPromo(id)
    return response
  }
)

export const postPromo = createAsyncThunk(
  'promos/createPromo',
  async (promo) => {
    const response = await promoAPI.postPromo(promo)
    return response
  }
)

export const updatePromo = createAsyncThunk(
  'promos/updatePromo',
  async ({ id, promo }) => {
    const response = await promoAPI.updatePromo(promo, id)
    return response
  }
)

export const removePromo = createAsyncThunk(
  'promos/removePromo',
  async (id) => {
    const response = await promoAPI.removePromo(id)
    console.log(response);
    return response
  }
)