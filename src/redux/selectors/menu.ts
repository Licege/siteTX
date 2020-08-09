import { AppStateType } from '../redux-store'

export const getDishesSelector = ( state: AppStateType ) => {
    return state.menuPage.menu
}

export const getDishSelector = ( state: AppStateType ) => {
    return state.menuPage.dish
}

export const getCategoriesSelector = ( state: AppStateType ) => {
    return state.menuPage.categories
}
