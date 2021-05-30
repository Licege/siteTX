import { createDraftSafeSelector } from '@reduxjs/toolkit'

const selector = state => state.promosPage

export const getAllPromos = createDraftSafeSelector(selector, state => state.promos)
export const getCurrentPromo = createDraftSafeSelector(selector, state => state.currentPromo)