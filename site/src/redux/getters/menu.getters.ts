import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { AppStateType } from "../redux-store";

const selector = (state: AppStateType) => state.menuPage

export const getAllDishes = createDraftSafeSelector(selector, state => state.menu)
export const getCurrentDish = createDraftSafeSelector(selector, state => state.dish)
export const getAllCategories = createDraftSafeSelector(selector, state => state.categories)