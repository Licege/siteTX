import { createSlice } from '@reduxjs/toolkit';
import { categoryType, dishType } from '../../types/types'
import { requestCategories, requestDishById, requestDishes, requestDishesByCategoryId } from '../thunks/menu.thunk';

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    dish: {},
    menu: [] as Array<dishType>,
    categories: [] as Array<categoryType>
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(requestDishes.fulfilled, (state, action) => {
      state.menu = action.payload
    })
    builder.addCase(requestCategories.fulfilled, (state, action) => { state.categories = action.payload })
    builder.addCase(requestDishesByCategoryId.fulfilled, (state, action) => { state.menu = action.payload })
    builder.addCase(requestDishById.fulfilled, (state, action) => { state.dish = action.payload })
  }
})

export default menuSlice.reducer
