import { ActionsTypes } from '../actions/menu.actions'
import { categoryType, dishType } from '../../types/types'


const initialState = {
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

export default menuReducer
