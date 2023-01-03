import { createAsyncThunk } from '@reduxjs/toolkit';
import { menuAPI } from '@/api';

export const requestCategories = createAsyncThunk(
  'dishes/fetchAllCategories',
  async () => menuAPI.getCategories()
)

export const requestDishes = createAsyncThunk(
  'dishes/fetchAllDishes',
  async () => menuAPI.getMenu()
)

export const requestDishesByCategoryId = createAsyncThunk(
  'dishes/fetchAllDishesByCategory',
  async (categoryId: string|number) => menuAPI.getMenuByCategory(categoryId)
)

export const requestDishById = createAsyncThunk(
  'dishes/fetchDishById',
  async (id: number) => menuAPI.getDish(id)
)