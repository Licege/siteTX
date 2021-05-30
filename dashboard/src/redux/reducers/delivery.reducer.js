import { createSlice } from '@reduxjs/toolkit'
import {
    handleAddDishToOrder,
    handleIncreaseDishToOrder,
    handleDecreaseDishFromOrder,
    handleRemoveDishFromOrder, handleChangeDeliveryType
} from '../functions/delivery.functions'
import { requestOrdersDelivery, requestOrderDeliveryById, updateOrderDelivery, requestGlobalDeliverySettings, updateGlobalDeliverySettings, requestDeliverySettings, requestDeliverySettingsById, createDeliverySettings, updateDeliverySettings, deleteDeliverySettings  } from '../thunks/delivery.thunks'
import {removeValue, updateValue} from '../functions/common'

const deliverySlice = createSlice({
    name: 'delivery',
    initialState: {
        orders: [],
        totalCount: null,
        currentOrder: null,
        currentPage: 1,
        globalSettings: {},
        settings: [],
        currentSettings: null,
    },
    reducers: {
        addDishToOrder: handleAddDishToOrder,
        removeDishFromOrder: handleRemoveDishFromOrder,
        increaseDishFromList: handleIncreaseDishToOrder,
        decreaseDishFromList: handleDecreaseDishFromOrder,
        setCurrentPage: (state, action) => { state.currentPage = action.payload },
        wsUpdateOrder: (state, action) => {
            state.orders.push(action.payload)
            state.totalCount++
        },
        changeDeliveryType: handleChangeDeliveryType
    },
    extraReducers: {
        [requestOrdersDelivery.fulfilled]: (state, action) => {
            state.orders = action.payload.deliveries
            state.totalCount = action.payload.totalCount
        },
        [requestOrderDeliveryById.fulfilled]: (state, action) => { state.currentOrder = action.payload },
        [updateOrderDelivery.fulfilled]: updateValue('orders'),
        [requestGlobalDeliverySettings.fulfilled]: (state, action) => { state.globalSettings = action.payload },
        [updateGlobalDeliverySettings.fulfilled]: (state, action) => { state.globalSettings = action.payload },
        [requestDeliverySettings.fulfilled]: (state, action) => { state.settings = action.payload },
        [requestDeliverySettingsById.fulfilled]: (state, action) => { state.currentSettings = action.payload },
        [createDeliverySettings.fulfilled]: (state, action) => { state.settings.push(action.payload) },
        [updateDeliverySettings.fulfilled]: updateValue('settings'),
        [deleteDeliverySettings.fulfilled]: removeValue('settings')
    }
})

export const { addDishToOrder, removeDishFromOrder, increaseDishFromList, decreaseDishFromList, setCurrentPage } = deliverySlice.actions

export default deliverySlice.reducer
