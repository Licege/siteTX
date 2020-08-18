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
        total_price: 0,
    } as deliveryType,
    settings: [] as Array<deliverySettingsType>,
    global_settings: {} as deliveryGlobalSettingsType,
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
            let indexInDelivery = state.delivery.order.findIndex(item => item.dish_id === action.dish._id)
            let indexInOrderedDishes = state.orderedDishes.findIndex(dish => dish._id === action.dish._id)

            return {
                ...state,
                delivery: {
                    order: indexInDelivery !== -1 ?
                        state.delivery.order.map(order =>
                            (order.dish_id === action.dish._id ? {
                                dish_id: order.dish_id,
                                title: order.title,
                                count: order.count + 1,
                                cost: action.dish.cost,
                            } : order))
                        : [...state.delivery.order, {
                            dish_id: action.dish._id,
                            title: action.dish.title,
                            count: 1,
                            cost: action.dish.cost,
                        }],
                    total_price: state.delivery.total_price + action.dish.cost,
                },
                orderedDishes: indexInOrderedDishes === -1 ? [...state.orderedDishes, action.dish] : state.orderedDishes,
            }

        case 'BUCKET/INCREASE_DISH_COUNT':
            return {
                ...state,
                delivery: {
                    order: state.delivery.order.map(order =>
                        (order.dish_id === action.dish._id) ? {
                            dish_id: order.dish_id,
                            title: order.title,
                            count: order.count + 1,
                            cost: action.dish.cost,
                        } : order),
                    total_price: state.delivery.total_price + action.dish.cost,
                },
            }

        case 'BUCKET/REDUCE_DISH_COUNT':
            count = getDishesKey(state.delivery.order, action.dish._id, 'count')
            count = count ? count - 1 : -1
            return {
                ...state,
                delivery: {
                    order: count === 0
                        ? state.delivery.order.filter(dish => dish.dish_id !== action.dish._id)
                        : state.delivery.order.map(order => (order.dish_id === action.dish._id) ? {
                            dish_id: order.dish_id,
                            title: order.title,
                            count: order.count - 1,
                            cost: action.dish.cost,
                        } : order),
                    total_price: state.delivery.total_price - action.dish.cost,
                },
                orderedDishes: count === 0 ? state.orderedDishes.filter(dish => dish._id !== action.dish._id) : state.orderedDishes,
            }

        case 'BUCKET/CHANGE_DISH_COUNT':
            count = getDishesKey(state.delivery.order, action.dish._id, 'count')
            count = count ? count - 1 : -1
            return {
                ...state,
                delivery: {
                    order: state.delivery.order.map(order => (order.dish_id === action.dish._id) ? {
                        dish_id: order.dish_id,
                        title: order.title,
                        count: action.count,
                        cost: action.dish.cost,
                    } : order),
                    total_price: action.count > count
                        ? state.delivery.total_price + (action.count - 1 - count) * action.dish.cost
                        : state.delivery.total_price - (count - action.count + 1) * action.dish.cost,
                },
            }

        case 'BUCKET/REMOVE_DISH':
            const orderItem = state.delivery.order.find(dish => dish.dish_id === action.id)!
            return {
                ...state,
                delivery: {
                    order: state.delivery.order.filter(order => order.dish_id !== action.id),
                    total_price: state.delivery.total_price - orderItem.cost * orderItem.count,
                },
                orderedDishes: state.orderedDishes.filter(dish => dish._id !== action.id),
            }

        case 'BUCKET/CLEAR':
            return {
                ...state,
                delivery: {
                    order: [],
                    total_price: 0,
                },
                orderedDishes: [],
            }

        case 'BUCKET/GET_DELIVERY_SETTINGS':
            return {
                ...state, settings: action.settings,
            }
        case 'BUCKET/GET_DELIVERY_GLOBAL_SETTINGS':
            return {
                ...state, global_settings: action.settings,
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
    removeDish: (id: string) => ({ type: 'BUCKET/REMOVE_DISH', id } as const),
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
