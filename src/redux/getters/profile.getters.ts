import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { AppStateType } from "../redux-store";

const selector = (state: AppStateType) => state.profilePage

export const getMe = createDraftSafeSelector(selector, state => state.me)
export const getMyOrderHistory = createDraftSafeSelector(selector, state => state.ordersHistory)