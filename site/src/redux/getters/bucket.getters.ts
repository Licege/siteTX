import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { AppStateType } from '../redux-store';

const selector = (state: AppStateType) => state.bucket

export const getDeliveryOrder = createDraftSafeSelector(selector, state => state.delivery)
export const getAllOrderedDishes = createDraftSafeSelector(selector, state => state.orderedDishes)
export const getAllDeliverySettings = createDraftSafeSelector(selector, state => state.settings)
export const getGlobalDeliverySettings = createDraftSafeSelector(selector, state => state.globalSettings)
export const getStatusDelivery = createDraftSafeSelector(selector, state => state.statusOrder)
export const getPriceForDelivery = createDraftSafeSelector(selector, state => state.deliveryPrice)
export const getStatusDeliveryPost = createDraftSafeSelector(selector, state => state.isDeliveryPosted)