import { createSlice } from "@reduxjs/toolkit";
import { categoryType, dishType } from '../../types/types'
import {requestCategories, requestDishById, requestDishes, requestDishesByCategoryId} from "../thunks/menu.thunk";

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
            console.log(action.payload);
            state.menu = action.payload
        })
        builder.addCase(requestCategories.fulfilled, (state, action) => { state.categories = action.payload })
        builder.addCase(requestDishesByCategoryId.fulfilled, (state, action) => { state.menu = action.payload })
        builder.addCase(requestDishById.fulfilled, (state, action) => { state.dish = action.payload })
    }
})

export default menuSlice.reducer

// import { ActionsTypes } from '../actions/menu.actions'
// import { categoryType, dishType } from '../../types/types'
//
//
// const initialState = {
//     dish: {},
//     menu: [] as Array<dishType>,
//     categories: [] as Array<categoryType>,
// }
//
// type InitialStateType = typeof initialState;
//
// const menuReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
//     switch (action.type) {
//         case 'MENU/GET_MENU':
//             return { ...state, menu: action.menu }
//         case 'MENU/GET_MENU_BY_CATEGORY':
//             return { ...state, menu: action.menu }
//         case 'MENU/GET_DISH':
//             return { ...state, dish: action.dish }
//         case 'MENU/GET_CATEGORIES':
//             return { ...state, categories: action.categories }
//         default:
//             return state
//     }
// }
//
// export default menuReducer
