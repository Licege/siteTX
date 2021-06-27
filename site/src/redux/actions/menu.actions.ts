// import { InferActionsTypes } from '../redux-store';
import { categoryType, dishType } from '../../types/types';

export type ActionsTypes = any

export const actions = {
  getMenu: (menu: Array<dishType>) => ({ type: 'MENU/GET_MENU', menu } as const),
  getMenuByCategory: (menu: Array<dishType>) => ({ type: 'MENU/GET_MENU_BY_CATEGORY', menu } as const),
  getDish: (dish: dishType) => ({ type: 'MENU/GET_DISH', dish } as const),
  getCategories: (categories: Array<categoryType>) => ({
    type: 'MENU/GET_CATEGORIES',
    categories,
  } as const),
}