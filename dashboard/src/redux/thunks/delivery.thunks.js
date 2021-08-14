import { createAsyncThunk } from '@reduxjs/toolkit'
import { deliveryAPI, deliveryGlobalSettingsAPI, deliverySettingsAPI } from '../../api/api'

export const requestOrdersDelivery = createAsyncThunk(
  'delivery/fetchAllOrders',
  async ({ page = 1, filter }, { rejectWithValue }) => {
    try {
      return await deliveryAPI.getOrders(filter, page)
    } catch (e) {
      return rejectWithValue({ status: e.status })
    }
  }
)

export const requestOrderDeliveryById = createAsyncThunk(
  'delivery/fetchOrderById',
  async (id, { rejectWithValue }) => {
    try {
      return await deliveryAPI.getOrderById(id)
    } catch (e) {
      return rejectWithValue({ status: e.status })
    }
  }
)

export const updateOrderDelivery = createAsyncThunk(
  'delivery/updateOrder',
  async (order, { rejectWithValue }) => {
    try {
      return await deliveryAPI.updateOrder(order)
    } catch (e) {
      return rejectWithValue({ status: e.status })
    }
  }
)

export const requestGlobalDeliverySettings = createAsyncThunk(
  'delivery/fetchGlobalSettings',
  async (_, { rejectWithValue }) => {
    try {
      return await deliveryGlobalSettingsAPI.getSettings()
    } catch (e) {
      return rejectWithValue({ status: e.status })
    }
  }
)

export const updateGlobalDeliverySettings = createAsyncThunk(
  'delivery/updateGlobalSettings',
  async (settings, { rejectWithValue }) => {
    try {
      return await deliveryGlobalSettingsAPI.updateSettings(settings)
    } catch (e) {
      return rejectWithValue({ status: e.status })
    }
  }
)

export const requestDeliverySettings = createAsyncThunk(
  'delivery/fetchCommonSettings',
  async (_, { rejectWithValue }) => {
    try {
      return await deliverySettingsAPI.getSettings()
    } catch (e) {
      return rejectWithValue({ status: e.status })
    }
  }
)

export const requestDeliverySettingsById = createAsyncThunk(
  'delivery/fetchSettingsById',
  async (id, { rejectWithValue }) => {
    try {
      return await deliverySettingsAPI.getSettingsById(id)
    } catch (e) {
      return rejectWithValue({ status: e.status })
    }
  }
)

export const createDeliverySettings = createAsyncThunk(
  'delivery/createSettings',
  async (settings, { rejectWithValue }) => {
    try {
      return await deliverySettingsAPI.createSettings(settings)
    } catch (e) {
      return rejectWithValue({ status: e.status })
    }
  }
)

export const updateDeliverySettings = createAsyncThunk(
  'delivery/updateSettings',
  async (settings, { rejectWithValue }) => {
    try {
      return await deliverySettingsAPI.updateSettings(settings)
    } catch (e) {
      return rejectWithValue({ status: e.status })
    }
  }
)

export const deleteDeliverySettings = createAsyncThunk(
  'delivery/deleteSettings',
  async (id, { rejectWithValue }) => {
    try {
      return await deliverySettingsAPI.deleteSettings(id)
    } catch (e) {
      return rejectWithValue({ status: e.status })
    }
  }
)