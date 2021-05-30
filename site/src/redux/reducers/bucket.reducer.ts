import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    deliveryGlobalSettingsType,
    deliverySettingsType,
    deliveryType,
    dishType,
    orderDishType,
} from '../../types/types'
import {requestDeliverySettings, requestGlobalDeliverySettings, postOrder} from "../thunks/bucket.thunk";

type statusesType = 'created'|'error'

const bucketSlice = createSlice({
    name: 'bucket',
    initialState: {
        delivery: {
            order: [] as Array<orderDishType>,
            totalPrice: 0,
        } as deliveryType,
        settings: [] as Array<deliverySettingsType>,
        globalSettings: {} as deliveryGlobalSettingsType,
        orderedDishes: [] as Array<dishType>,
        deliveryPrice: 0 as number,
        isDeliveryPosted: false,
        statusOrder: ''
    },
    reducers: {
        addDish: (state, action: PayloadAction<dishType>) => {
            const indexInDelivery = state.delivery.order.findIndex(item => item.dishId === action.payload.id)
            const indexInOrderedDishes = state.orderedDishes.findIndex(dish => dish.id === action.payload.id)

            if (indexInDelivery !== -1) {
                state.delivery.order[indexInDelivery] = {
                    dishId: action.payload.id,
                    title: action.payload.title,
                    count: state.delivery.order[indexInDelivery].count + 1,
                    cost: action.payload.cost
                }
            } else {
                state.delivery.order.push({
                    dishId: action.payload.id,
                    title: action.payload.title,
                    count: 1,
                    cost: action.payload.cost
                })
            }
            state.delivery.totalPrice += action.payload.cost

            if (indexInOrderedDishes === -1) {
                state.orderedDishes.push(action.payload)
            }
        },
        increaseDishCount: (state, action: PayloadAction<dishType>) => {
            const dishIndex = state.delivery.order.findIndex(dish => dish.dishId === action.payload.id)

            if (dishIndex !== -1) {
                const { count } = state.delivery.order[dishIndex]

                state.delivery.order[dishIndex] = {
                    dishId: action.payload.id,
                    title: action.payload.title,
                    count: count + 1,
                    cost: action.payload.cost
                }

                state.delivery.totalPrice += action.payload.cost
            } else {
                console.error('Increase dish count error')
            }
        },
        reduceDishCount: (state, action: PayloadAction<dishType>) => {
            const dishIndex = state.delivery.order.findIndex(dish => dish.dishId === action.payload.id)

            if (dishIndex !== -1) {
                const { count } = state.delivery.order[dishIndex]

                if (count === 1) {
                    state.delivery.order.splice(dishIndex, 1)
                    state.orderedDishes = state.orderedDishes.filter(dish => dish.id !== action.payload.id)
                } else {
                    state.delivery.order[dishIndex] = {
                        dishId: action.payload.id,
                        title: action.payload.title,
                        count: count - 1,
                        cost: action.payload.cost
                    }
                }

                state.delivery.totalPrice -= action.payload.cost
            } else {
                console.error('Increase dish count error')
            }
        },
        changeDishCount: (state, action) => {
            const dishIndex = state.delivery.order.findIndex(dish => dish.dishId === action.payload.dish.id)
            const { count } = state.delivery.order[dishIndex]
            const newCount = count < 1 ? 1 : count - 1

            state.delivery.order[dishIndex] = {
                dishId: action.payload.dish.id,
                title: action.payload.dish.title,
                count: action.payload.count,
                cost: action.payload.cost
            }

            if (action.payload.dish.count > newCount) {
                state.delivery.totalPrice += (action.payload.count - 1 - count) * action.payload.dish.cost
            } else {
                state.delivery.totalPrice -= (count - action.payload.count + 1) * action.payload.dish.cost
            }
        },
        removeDish: (state, action: PayloadAction<number|string>) => {
            const orderItem = state.delivery.order.find(dish => dish.dishId === action.payload)

            if (orderItem) {
                state.delivery.order = state.delivery.order.filter(order => order.dishId !== action.payload)
                state.delivery.totalPrice -= orderItem.cost * orderItem.count
                state.orderedDishes = state.orderedDishes.filter(dish => dish.id !== action.payload)
            } else {
                console.error('Remove dish error')
            }
        },
        clearBucket: state => {
            state.delivery = { order: [], totalPrice: 0 }
            state.orderedDishes = []
        },
        changeOrderStatus: (state, action: PayloadAction<statusesType>) => {
            state.statusOrder = action.payload
        },
        changeDeliveryPosted: (state, action: PayloadAction<boolean>) => {
            state.isDeliveryPosted = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(requestGlobalDeliverySettings.fulfilled, (state, action) => { state.globalSettings = action.payload })
        builder.addCase(requestDeliverySettings.fulfilled, (state, action) => { state.settings = action.payload })
    }
})

export const { addDish, increaseDishCount, reduceDishCount, changeDishCount, removeDish, clearBucket, changeOrderStatus, changeDeliveryPosted } = bucketSlice.actions

export default bucketSlice.reducer

// import { ActionsTypes } from '../actions/bucket.actions'
// import {
//     deliveryGlobalSettingsType,
//     deliverySettingsType,
//     deliveryType,
//     dishType,
//     orderDishType,
// } from '../../types/types'
// import { getDishesKey } from '../../plugins/helpers'
//
//
// const initialState = {
//     delivery: {
//         order: [] as Array<orderDishType>,
//         totalPrice: 0,
//     } as deliveryType,
//     settings: [] as Array<deliverySettingsType>,
//     globalSettings: {} as deliveryGlobalSettingsType,
//     orderedDishes: [] as Array<dishType>,
//     deliveryPrice: 0 as number,
//     isDeliveryPosted: false,
//     statusOrder: '',
// }
//
// export type InitialState = typeof initialState;
//
// const bucketReducer = (state = initialState, action: ActionsTypes): InitialState => {
//     let count = 0
//
//     switch (action.type) {
//         case 'BUCKET/ADD_DISH':
//             let indexInDelivery = state.delivery.order.findIndex(item => item.dishId === action.dish.id)
//             let indexInOrderedDishes = state.orderedDishes.findIndex(dish => dish.id === action.dish.id)
//
//             return {
//                 ...state,
//                 delivery: {
//                     order: indexInDelivery !== -1 ?
//                         state.delivery.order.map(order =>
//                             (order.dishId === action.dish.id ? {
//                                 dishId: order.dishId,
//                                 title: order.title,
//                                 count: order.count + 1,
//                                 cost: action.dish.cost,
//                             } : order))
//                         : [...state.delivery.order, {
//                             dishId: action.dish.id,
//                             title: action.dish.title,
//                             count: 1,
//                             cost: action.dish.cost,
//                         }],
//                     totalPrice: state.delivery.totalPrice + action.dish.cost,
//                 },
//                 orderedDishes: indexInOrderedDishes === -1 ? [...state.orderedDishes, action.dish] : state.orderedDishes,
//             }
//
//         case 'BUCKET/INCREASE_DISH_COUNT':
//             return {
//                 ...state,
//                 delivery: {
//                     order: state.delivery.order.map(order =>
//                         (order.dishId === action.dish.id) ? {
//                             dishId: order.dishId,
//                             title: order.title,
//                             count: order.count + 1,
//                             cost: action.dish.cost,
//                         } : order),
//                     totalPrice: state.delivery.totalPrice + action.dish.cost,
//                 },
//             }
//
//         case 'BUCKET/REDUCE_DISH_COUNT':
//             count = getDishesKey(state.delivery.order, action.dish.id, 'count')
//             count = count ? count - 1 : -1
//             return {
//                 ...state,
//                 delivery: {
//                     order: count === 0
//                         ? state.delivery.order.filter(dish => dish.dishId !== action.dish.id)
//                         : state.delivery.order.map(order => (order.dishId === action.dish.id) ? {
//                             dishId: order.dishId,
//                             title: order.title,
//                             count: order.count - 1,
//                             cost: action.dish.cost,
//                         } : order),
//                     totalPrice: state.delivery.totalPrice - action.dish.cost,
//                 },
//                 orderedDishes: count === 0 ? state.orderedDishes.filter(dish => dish.id !== action.dish.id) : state.orderedDishes,
//             }
//
//         case 'BUCKET/CHANGE_DISH_COUNT':
//             count = getDishesKey(state.delivery.order, action.dish.id, 'count')
//             count = count ? count - 1 : -1
//             return {
//                 ...state,
//                 delivery: {
//                     order: state.delivery.order.map(order => (order.dishId === action.dish.id) ? {
//                         dishId: order.dishId,
//                         title: order.title,
//                         count: action.count,
//                         cost: action.dish.cost,
//                     } : order),
//                     totalPrice: action.count > count
//                         ? state.delivery.totalPrice + (action.count - 1 - count) * action.dish.cost
//                         : state.delivery.totalPrice - (count - action.count + 1) * action.dish.cost,
//                 },
//             }
//
//         case 'BUCKET/REMOVE_DISH':
//             const orderItem = state.delivery.order.find(dish => dish.dishId === action.id)!
//             return {
//                 ...state,
//                 delivery: {
//                     order: state.delivery.order.filter(order => order.dishId !== action.id),
//                     totalPrice: state.delivery.totalPrice - orderItem.cost * orderItem.count,
//                 },
//                 orderedDishes: state.orderedDishes.filter(dish => dish.id !== action.id),
//             }
//
//         case 'BUCKET/CLEAR':
//             return {
//                 ...state,
//                 delivery: {
//                     order: [],
//                     totalPrice: 0,
//                 },
//                 orderedDishes: [],
//             }
//
//         case 'BUCKET/GET_DELIVERY_SETTINGS':
//             return {
//                 ...state, settings: action.settings,
//             }
//         case 'BUCKET/GET_DELIVERY_GLOBAL_SETTINGS':
//             return {
//                 ...state, globalSettings: action.settings,
//             }
//         default:
//             return state
//     }
// }
//
// export default bucketReducer
