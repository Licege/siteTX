import { createAsyncThunk } from '@reduxjs/toolkit'
import { menuAPI } from '../../api/api'

export const createDish = createAsyncThunk(
  'menu/createDish',
  async (dish) => {
    const response = await menuAPI.createDish(dish)
    return response
  }
)

export const requestDishes = createAsyncThunk(
  'menu/fetchAllDishes',
  async () => {
    const response = await menuAPI.getDishes()
    return response
  }
)

export const requestDishesByCategory = createAsyncThunk(
  'menu/fetchAllDishesByCategory',
  async (category) => {
    const response = await menuAPI.getDishesByCategory(category)
    return response
  }
)

export const requestDish = createAsyncThunk(
  'menu/fetchCurrentDish',
  async (id) => {
    const response = await menuAPI.getDish(id);
    return response
  }
)

export const updateDish = createAsyncThunk(
  'menu/updateDishById',
  async ({ dish, id }) => {
    console.log(dish)
    const response = await menuAPI.updateDish(dish, id)
    return response
  }
)

export const deleteDish = createAsyncThunk(
  'menu/deleteDishById',
  async (id) => {
    const response = await menuAPI.deleteDish(id)
    return response
  }
)

export const requestCategories = createAsyncThunk(
  'menu/fetchAllCategories',
  async () => {
    const response = await menuAPI.getCategories()
    return response
  }
)

export const requestCategory = createAsyncThunk(
  'menu/fetchCategoryById',
  async (id) => {
    const response = await menuAPI.getCategory(id)
    return response
  }
)

export const createCategory = createAsyncThunk(
  'menu/createCategory',
  async (category) => {
    const response = await menuAPI.createCategory(category)
    return response
  }
)

export const updateCategory = createAsyncThunk(
  'menu/updateCategory',
  async (category) => {
    const response = await menuAPI.updateCategory(category)
    return response
  }
)

export const deleteCategory = createAsyncThunk(
  'menu/deleteCategory',
  async (id) => {
    const response = await menuAPI.deleteCategory(id)
    return response
  }
)