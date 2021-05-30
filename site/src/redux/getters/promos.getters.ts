import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { AppStateType } from "../redux-store";

const selector = (state: AppStateType) => state.promosPage

export const getPromos = createDraftSafeSelector(selector, state => state.promos)
export const getCurrentPromo = createDraftSafeSelector(selector, state => state.currentPromo)