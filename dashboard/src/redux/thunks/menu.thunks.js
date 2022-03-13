import {createAsyncThunk} from '@reduxjs/toolkit'
import {menuAPI} from '../../api/api'

export const createDish = createAsyncThunk(
  'menu/createDish',
  async (dish, {rejectWithValue}) => {
    try {
      return await menuAPI.createDish(dish)
    } catch (e) {
      return rejectWithValue({status: e.status})
    }
  }
)

export const requestDishes = createAsyncThunk(
  'menu/fetchAllDishes',
  async (_, {rejectWithValue}) => {
    try {
      return await menuAPI.getDishes()
    } catch (e) {
      return rejectWithValue({status: e.status})
    }
  }
)

export const requestDishesByCategory = createAsyncThunk(
  'menu/fetchAllDishesByCategory',
  async (category, {rejectWithValue}) => {
    try {
      return await menuAPI.getDishesByCategory(category)
    } catch (e) {
      return rejectWithValue({status: e.status})
    }
  }
)

export const requestDish = createAsyncThunk(
  'menu/fetchCurrentDish',
  async (id, {rejectWithValue}) => {
    try {
      return await menuAPI.getDish(id);
    } catch (e) {
      return rejectWithValue({status: e.status})
    }
  }
)

export const updateDish = createAsyncThunk(
  'menu/updateDishById',
  async ({dish, id}, {rejectWithValue}) => {
    try {
      return await menuAPI.updateDish(dish, id)
    } catch (e) {
      return rejectWithValue({status: e.status})
    }
  }
)

export const deleteDish = createAsyncThunk(
  'menu/deleteDishById',
  async (id, {rejectWithValue}) => {
    try {
      return await menuAPI.deleteDish(id)
    } catch (e) {
      return rejectWithValue({status: e.status})
    }
  }
)

export const requestCategories = createAsyncThunk(
  'menu/fetchAllCategories',
  async (_, {rejectWithValue}) => {
    try {
      return await menuAPI.getCategories()
    } catch (e) {
      return rejectWithValue({status: e.status})
    }
  }
)

export const requestCategory = createAsyncThunk(
  'menu/fetchCategoryById',
  async (id, {rejectWithValue}) => {
    try {
      return await menuAPI.getCategory(id)
    } catch (e) {
      return rejectWithValue({status: e.status})
    }
  }
)

export const createCategory = createAsyncThunk(
  'menu/createCategory',
  async (category, {rejectWithValue}) => {
    try {
      return await menuAPI.createCategory(category)
    } catch (e) {
      return rejectWithValue({status: e.status})
    }
  }
)

export const updateCategory = createAsyncThunk(
  'menu/updateCategory',
  async (category, {rejectWithValue}) => {
    try {
      return await menuAPI.updateCategory(category)
    } catch (e) {
      return rejectWithValue({status: e.status})
    }
  }
)

export const deleteCategory = createAsyncThunk(
  'menu/deleteCategory',
  async (id, {rejectWithValue}) => {
    try {
      return await menuAPI.deleteCategory(id)
    } catch (e) {
      return rejectWithValue({status: e.status})
    }
  }
)