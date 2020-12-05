import { ThunkAction } from 'redux-thunk'
import {
    deliveryGlobalSettingsType,
    deliverySettingsType,
    deliveryType,
    dishType,
    IDeliveryPost,
    orderDishType,
} from '../types/types'
import { bucketAPI } from '../api/api'
import { getDishesKey } from '../plugins/helpers'
import { AppStateType, InferActionsTypes } from './redux-store'


let initialState = {
    delivery: {
        order: [] as Array<orderDishType>,
        totalPrice: 0,
    } as deliveryType,
    settings: [] as Array<deliverySettingsType>,
    globalSettings: {} as deliveryGlobalSettingsType,
    orderedDishes: [] as Array<dishType>,
    deliveryPrice: 0 as number,
    isDeliveryPosted: false,
    statusOrder: '',
}

export type InitialState = typeof initialState;

const bucketReducer = (state = initialState, action: ActionsTypes): InitialState => {
    let count = 0

    switch (action.type) {
        case 'BUCKET/ADD_DISH':
            let indexInDelivery = state.delivery.order.findIndex(item => item.dishId === action.dish.id)
            let indexInOrderedDishes = state.orderedDishes.findIndex(dish => dish.id === action.dish.id)

            return {
                ...state,
                delivery: {
                    order: indexInDelivery !== -1 ?
                        state.delivery.order.map(order =>
                            (order.dishId === action.dish.id ? {
                                dishId: order.dishId,
                                title: order.title,
                                count: order.count + 1,
                                cost: action.dish.cost,
                            } : order))
                        : [...state.delivery.order, {
                            dishId: action.dish.id,
                            title: action.dish.title,
                            count: 1,
                            cost: action.dish.cost,
                        }],
                    totalPrice: state.delivery.totalPrice + action.dish.cost,
                },
                orderedDishes: indexInOrderedDishes === -1 ? [...state.orderedDishes, action.dish] : state.orderedDishes,
            }

        case 'BUCKET/INCREASE_DISH_COUNT':
            return {
                ...state,
                delivery: {
                    order: state.delivery.order.map(order =>
                        (order.dishId === action.dish.id) ? {
                            dishId: order.dishId,
                            title: order.title,
                            count: order.count + 1,
                            cost: action.dish.cost,
                        } : order),
                    totalPrice: state.delivery.totalPrice + action.dish.cost,
                },
            }

        case 'BUCKET/REDUCE_DISH_COUNT':
            count = getDishesKey(state.delivery.order, action.dish.id, 'count')
            count = count ? count - 1 : -1
            return {
                ...state,
                delivery: {
                    order: count === 0
                        ? state.delivery.order.filter(dish => dish.dishId !== action.dish.id)
                        : state.delivery.order.map(order => (order.dishId === action.dish.id) ? {
                            dishId: order.dishId,
                            title: order.title,
                            count: order.count - 1,
                            cost: action.dish.cost,
                        } : order),
                    totalPrice: state.delivery.totalPrice - action.dish.cost,
                },
                orderedDishes: count === 0 ? state.orderedDishes.filter(dish => dish.id !== action.dish.id) : state.orderedDishes,
            }

        case 'BUCKET/CHANGE_DISH_COUNT':
            count = getDishesKey(state.delivery.order, action.dish.id, 'count')
            count = count ? count - 1 : -1
            return {
                ...state,
                delivery: {
                    order: state.delivery.order.map(order => (order.dishId === action.dish.id) ? {
                        dishId: order.dishId,
                        title: order.title,
                        count: action.count,
                        cost: action.dish.cost,
                    } : order),
                    totalPrice: action.count > count
                        ? state.delivery.totalPrice + (action.count - 1 - count) * action.dish.cost
                        : state.delivery.totalPrice - (count - action.count + 1) * action.dish.cost,
                },
            }

        case 'BUCKET/REMOVE_DISH':
            const orderItem = state.delivery.order.find(dish => dish.dishId === action.id)!
            return {
                ...state,
                delivery: {
                    order: state.delivery.order.filter(order => order.dishId !== action.id),
                    totalPrice: state.delivery.totalPrice - orderItem.cost * orderItem.count,
                },
                orderedDishes: state.orderedDishes.filter(dish => dish.id !== action.id),
            }

        case 'BUCKET/CLEAR':
            return {
                ...state,
                delivery: {
                    order: [],
                    totalPrice: 0,
                },
                orderedDishes: [],
            }

        case 'BUCKET/GET_DELIVERY_SETTINGS':
            return {
                ...state, settings: action.settings,
            }
        case 'BUCKET/GET_DELIVERY_GLOBAL_SETTINGS':
            return {
                ...state, globalSettings: action.settings,
            }
        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    addDish: (dish: dishType) => ({ type: 'BUCKET/ADD_DISH', dish } as const),
    increaseDishCount: (dish: dishType) => ({ type: 'BUCKET/INCREASE_DISH_COUNT', dish } as const),
    reduceDishCount: (dish: dishType) => ({ type: 'BUCKET/REDUCE_DISH_COUNT', dish } as const),
    removeDish: (id: number | string) => ({ type: 'BUCKET/REMOVE_DISH', id } as const),
    changeDishCount: (dish: dishType, count: number) => ({
        type: 'BUCKET/CHANGE_DISH_COUNT',
        dish,
        count,
    } as const),
    clearBucket: () => ({ type: 'BUCKET/CLEAR' } as const),
    changeDeliveryPosted: (status: boolean) => ({
        type: 'BUCKET/DELIVERY_POSTED',
        status,
    } as const),
    changeOrderStatus: (status: 'created' | 'error') => ({ type: 'BUCKET/ORDER_STATUS', status } as const),
    getDeliverySettings: (settings: Array<deliverySettingsType>) => ({
        type: 'BUCKET/GET_DELIVERY_SETTINGS',
        settings,
    } as const),
    getDeliveryGlobalSettings: (settings: deliveryGlobalSettingsType) => ({
        type: 'BUCKET/GET_DELIVERY_GLOBAL_SETTINGS',
        settings,
    } as const),
}

export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestDeliverySettings = (): ThunkType => {
    return async (dispatch) => {
        let response = await bucketAPI.getDeliverySettings()
        dispatch(actions.getDeliverySettings(response.data))
    }
}
export const requestGlobalDeliverySettings = (): ThunkType => {
    return async (dispatch) => {
        let response = await bucketAPI.getDeliveryGlobalSettings()
        dispatch(actions.getDeliveryGlobalSettings(response.data))
    }
}

export const postOrder = (order: IDeliveryPost): ThunkType => {
    return async (dispatch) => {
        let response = await bucketAPI.postOrder(order)
        if (response.status === 201 || response.status === 200) {
            dispatch(actions.changeOrderStatus('created'))
            dispatch(actions.changeDeliveryPosted(true))
            dispatch(actions.clearBucket())
        } else {
            dispatch(actions.changeOrderStatus('error'))
        }
    }
}

export default bucketReducer
