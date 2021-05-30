import { createDraftSafeSelector } from '@reduxjs/toolkit'

const selector = state => state.deliveryPage

export const getDeliveryOrders = createDraftSafeSelector(selector, state => state.orders)
export const getDeliveryOrdersTotal = createDraftSafeSelector(selector, state => state.totalCount)
export const getCurrentDeliveryOrder = createDraftSafeSelector(selector, state => state.currentOrder)
export const getCurrentDeliveryPage = createDraftSafeSelector(selector, state => state.currentPage)
export const getDeliveryGlobalSettings = createDraftSafeSelector(selector, state => state.globalSettings)
export const getDeliveryCommonSettings = createDraftSafeSelector(selector, state => state.settings)
export const getDeliveryCurrentCommonSettings = createDraftSafeSelector(selector, state => state.currentSettings)