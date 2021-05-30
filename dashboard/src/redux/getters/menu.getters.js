import { createDraftSafeSelector } from '@reduxjs/toolkit'

const selector = state => state.menuPage

export const getMenu = createDraftSafeSelector(selector, menu => menu.dishes)
export const getCategories = createDraftSafeSelector(selector, menu => menu.categories)
export const getCurrentDish = createDraftSafeSelector(selector, menu => menu.dish)
export const getCurrentCategory = createDraftSafeSelector(selector, menu => menu.category)