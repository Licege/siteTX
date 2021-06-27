import { createAsyncThunk } from '@reduxjs/toolkit';
import { promoAPI } from '../../api/api';

export const requestPromos = createAsyncThunk(
  'promos/fetchAllPromos',
  async () => promoAPI.getPromos()
)

export const requestPromoById = createAsyncThunk(
  'promos/fetchPromoById',
  async (id: string) => promoAPI.getPromoById(id)
)