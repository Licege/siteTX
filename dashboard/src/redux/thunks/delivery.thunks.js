import { createAsyncThunk } from '@reduxjs/toolkit'
import { deliveryAPI, deliveryGlobalSettingsAPI, deliverySettingsAPI } from '../../api/api'

export const requestOrdersDelivery = createAsyncThunk(
  'delivery/fetchAllOrders',
  async ({ page = 1, filter }) => {
    const response = await deliveryAPI.getOrders(filter, page)
    return response
  }
)

export const requestOrderDeliveryById = createAsyncThunk(
  'delivery/fetchOrderById',
  async (id) => {
    const response = await deliveryAPI.getOrderById(id)
    return response
  }
)

export const updateOrderDelivery = createAsyncThunk(
  'delivery/updateOrder',
  async (order) => {
    console.log(order)
    const response = await deliveryAPI.updateOrder(order)
    return response
  }
)

export const requestGlobalDeliverySettings = createAsyncThunk(
  'delivery/fetchGlobalSettings',
  async () => {
    const response = await deliveryGlobalSettingsAPI.getSettings()
    return response
  }
)

export const updateGlobalDeliverySettings = createAsyncThunk(
  'delivery/updateGlobalSettings',
  async (settings) => {
    const response = await deliveryGlobalSettingsAPI.updateSettings(settings)
    return response
  }
)

export const requestDeliverySettings = createAsyncThunk(
  'delivery/fetchCommonSettings',
  async () => {
    const response = await deliverySettingsAPI.getSettings()
    return response
  }
)

export const requestDeliverySettingsById = createAsyncThunk(
  'delivery/fetchSettingsById',
  async (id) => {
    const response = await deliverySettingsAPI.getSettingsById(id)
    return response
  }
)

export const createDeliverySettings = createAsyncThunk(
  'delivery/createSettings',
  async (settings) => {
    const response = await deliverySettingsAPI.createSettings(settings)
    return response
  }
)

export const updateDeliverySettings = createAsyncThunk(
  'delivery/updateSettings',
  async (settings) => {
    const response = await deliverySettingsAPI.updateSettings(settings)
    return response
  }
)

export const deleteDeliverySettings = createAsyncThunk(
  'delivery/deleteSettings',
  async (id) => {
    const response = await deliverySettingsAPI.deleteSettings(id)
    return response
  }
)