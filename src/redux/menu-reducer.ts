import { ThunkAction } from 'redux-thunk'
import { categoryType, dishType } from '../types/types'
import { menuAPI } from '../api/api'
import { AppStateType, InferActionsTypes } from './redux-store'


let initialState = {
    dish: {},
    menu: [] as Array<dishType>,
    categories: [] as Array<categoryType>,
}

type InitialStateType = typeof initialState;

const menuReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'MENU/GET_MENU':
            return { ...state, menu: action.menu }
        case 'MENU/GET_MENU_BY_CATEGORY':
            return { ...state, menu: action.menu }
        case 'MENU/GET_DISH':
            return { ...state, dish: action.dish }
        case 'MENU/GET_CATEGORIES':
            return { ...state, categories: action.categories }
        default:
            return state
    }
}

export type ActionsTypes = InferActionsTypes<typeof actions>

const actions = {
    getMenu: (menu: Array<dishType>) => ({ type: 'MENU/GET_MENU', menu } as const),
    getMenuByCategory: (menu: Array<dishType>) => ({ type: 'MENU/GET_MENU_BY_CATEGORY', menu } as const),
    getDish: (dish: dishType) => ({ type: 'MENU/GET_DISH', dish } as const),
    getCategories: (categories: Array<categoryType>) => ({
        type: 'MENU/GET_CATEGORIES',
        categories,
    } as const),
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getCategories = (): ThunkType => {
    return async (dispatch) => {
        let response = await menuAPI.getCategories()
        dispatch(actions.getCategories(response.data))
    }
}

export const getMenu = (): ThunkType => {
    return async (dispatch) => {
        let response = await menuAPI.getMenu()
        dispatch(actions.getMenu(response.data))
    }
}

export const getMenuByCategory = (category: string): ThunkType => {
    return async (dispatch) => {
        let response = await menuAPI.getMenuByCategory(category)
        if (!response.data) {
            dispatch(actions.getMenuByCategory([]))
        } else dispatch(actions.getMenuByCategory(response.data))
    }
}

export const getDish = (id: number): ThunkType => {
    return async (dispatch) => {
        let response = await menuAPI.getDish(id)
        dispatch(actions.getDish(response.data))
    }
}

export default menuReducer
