import { AppStateType } from '../redux-store'

export const getDishesSelector = (state: any) => {
    return state.menuPage.menu
}

export const getDishSelector = (state: any) => {
    return state.menuPage.dish
}

export const getCategoriesSelector = (state: any) => {
    return state.menuPage.categories
}
