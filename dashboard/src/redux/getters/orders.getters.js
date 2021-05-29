import { createDraftSafeSelector } from '@reduxjs/toolkit'

const selector = state => state.ordersPage

export const getOrders = createDraftSafeSelector(selector, state => state.orders)