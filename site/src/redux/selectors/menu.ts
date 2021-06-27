import { AppStateType } from '../redux-store'

export const getDishesSelector = (state: AppStateType) => state.menuPage.menu

export const getDishSelector = (state: AppStateType) => state.menuPage.dish

export const getCategoriesSelector = (state: AppStateType) => state.menuPage.categories
