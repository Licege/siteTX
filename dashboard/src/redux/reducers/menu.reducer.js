import { createSlice } from '@reduxjs/toolkit'
import {
  createDish,
  createCategory,
  requestDishes,
  requestDish,
  requestDishesByCategory,
  requestCategories,
  requestCategory,
  updateDish,
  updateCategory,
  deleteDish,
  deleteCategory
} from '../thunks/menu.thunks'


const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        dish: null,
        dishes: [],
        category: null,
        categories: [],
    },
    reducers: {},
    extraReducers: {
        [createDish.fulfilled]: (state, action) => void state.dishes.push(action.payload),
        [requestDishes.fulfilled]: (state, action) => void (state.dishes = action.payload) ,
        [requestDish.fulfilled]: (state, action) => void (state.dish = action.payload),
        [requestDishesByCategory.fulfilled]: (state, action) => void (state.dishes = action.payload),
        [requestCategories.fulfilled]: (state, action) => void (state.categories = action.payload),
        [requestCategory.fulfilled]: (state, action) => void (state.category = action.payload),
        [createCategory.fulfilled]: (state, action) => void state.categories.push(action.payload),
        [updateDish.fulfilled]: (state, action) => {
            state.dishes = state.dishes.map(dish => dish.id === action.payload.id ? action.payload : dish)
        },
        [deleteDish.fulfilled]: (state, action) => {
            state.dishes = state.dishes.filter(dish => dish.id !== action.payload.id)
        },
        [updateCategory.fulfilled]: (state, action) => {
            state.categories = state.categories.map(cat => cat.id === action.payload.id ? action.payload : cat)
        },
        [deleteCategory.fulfilled]: (state, action) => {
          state.categories = state.categories.filter(category => category.id !== action.payload)
        }
    }
})


export default menuSlice.reducer
