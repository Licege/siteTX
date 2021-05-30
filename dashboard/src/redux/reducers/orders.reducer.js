import { createSlice } from '@reduxjs/toolkit'
import {requestAllOrders} from '../thunks/orders.thunks'

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: []
    },
    reducers: {},
    extraReducers: {
        [requestAllOrders.fulfilled]: (state, action) => { state.orders = action.payload }
    }
})

export default orderSlice.reducer
