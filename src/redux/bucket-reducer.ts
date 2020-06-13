import {
    deliveryGlobalSettingsType,
    deliverySettingsType,
    deliveryType,
    dishType, IDeliveryPost,
    orderDishType
} from "../types/types"
import {bucketAPI} from "../api/api"
import {getDishesKey} from "../plugins/helpers"

const ADD_DISH = 'BUCKET/ADD_DISH'
const INCREASE_DISH_COUNT = 'BUCKET/INCREASE_DISH_COUNT'
const REDUCE_DISH_COUNT = 'BUCKET/REDUCE_DISH_COUNT'
const CHANGE_DISH_COUNT = 'BUCKET/CHANGE_DISH_COUNT'
const REMOVE_DISH = 'BUCKET/REMOVE_DISH'
const CLEAR_BUCKET = 'BUCKET/CLEAR'
const DELIVERY_POSTED = 'BUCKET/DELIVERY_POSTED'
const ORDER_STATUS = 'BUCKET/ORDER_STATUS'

const GET_DELIVERY_SETTINGS = 'BUCKET/GET_DELIVERY_SETTINGS'
const GET_DELIVERY_GLOBAL_SETTINGS = 'BUCKET/GET_DELIVERY_GLOBAL_SETTINGS'

let initialState = {
    delivery: {
        order: [] as Array<orderDishType>,
        total_price: 0
    } as deliveryType,
    settings: [] as Array<deliverySettingsType>,
    global_settings: {} as deliveryGlobalSettingsType,
    orderedDishes: [] as Array<dishType>,
    deliveryPrice: 0 as number,
    isDeliveryPosted: false,
    statusOrder: ''
};

type initialStateType = typeof initialState;

const bucketReducer = (state = initialState, action: ActionType): initialStateType => {
    let count = 0;

    switch(action.type) {
        case ADD_DISH:
            let indexInDelivery = state.delivery.order.findIndex(item => item.dish_id === action.dish._id);
            let indexInOrderedDishes = state.orderedDishes.findIndex(dish => dish._id === action.dish._id);

            return {
                ...state,
                delivery: {
                    order: indexInDelivery !== -1 ?
                        state.delivery.order.map(order =>
                            (order.dish_id === action.dish._id ? {
                                dish_id: order.dish_id,
                                title: order.title,
                                count: order.count + 1,
                                cost: action.dish.cost
                            } : order))
                        : [...state.delivery.order, {dish_id: action.dish._id, title: action.dish.title, count: 1, cost: action.dish.cost}],
                    total_price: state.delivery.total_price + action.dish.cost,
                },
                orderedDishes: indexInOrderedDishes === -1 ? [...state.orderedDishes, action.dish] : state.orderedDishes
            };

        case INCREASE_DISH_COUNT:
            return {
                ...state,
                delivery: {
                    order: state.delivery.order.map(order =>
                        (order.dish_id === action.dish._id) ? {
                            dish_id: order.dish_id,
                            title: order.title,
                            count: order.count + 1,
                            cost: action.dish.cost
                        } : order),
                    total_price: state.delivery.total_price + action.dish.cost
                }
            };

        case REDUCE_DISH_COUNT:
            count = getDishesKey(state.delivery.order, action.dish._id, 'count'); count = count ? count - 1 : -1;
            return {
                ...state,
                delivery: {
                    order: count === 0
                        ? state.delivery.order.filter(dish => dish.dish_id !== action.dish._id)
                        : state.delivery.order.map(order => (order.dish_id === action.dish._id) ? {
                            dish_id: order.dish_id,
                            title: order.title,
                            count: order.count - 1,
                            cost: action.dish.cost
                        } : order),
                    total_price: state.delivery.total_price - action.dish.cost
                },
                orderedDishes: count === 0 ? state.orderedDishes.filter(dish => dish._id !== action.dish._id) : state.orderedDishes
            };

        case CHANGE_DISH_COUNT:
            count = getDishesKey(state.delivery.order, action.dish._id, 'count'); count = count ? count - 1 : -1;
            return {
                ...state,
                delivery: {
                    order: state.delivery.order.map(order => (order.dish_id === action.dish._id) ? {
                        dish_id: order.dish_id,
                        title: order.title,
                        count: action.count,
                        cost: action.dish.cost
                    } : order),
                    total_price: action.count > count
                        ? state.delivery.total_price + (action.count - 1 - count) * action.dish.cost
                        : state.delivery.total_price - (count - action.count + 1) * action.dish.cost
                }
            };

        case REMOVE_DISH:
            const orderItem = state.delivery.order.find(dish => dish.dish_id === action.id)!
            return {
                ...state,
                delivery: {
                    order: state.delivery.order.filter(order => order.dish_id !== action.id),
                    total_price: state.delivery.total_price - orderItem.cost * orderItem.count
                },
                orderedDishes: state.orderedDishes.filter(dish => dish._id !== action.id) };

        case CLEAR_BUCKET:
            return {
                ...state,
                delivery: {
                    order: [],
                    total_price: 0
                },
                orderedDishes: []
            };

        case GET_DELIVERY_SETTINGS:
            return {
                ...state, settings: action.settings
            };
        case GET_DELIVERY_GLOBAL_SETTINGS:
            return {
                ...state, global_settings: action.settings
            };
        default:
            return state;
    }
};

type addDishACType = {
    type: typeof ADD_DISH,
    dish: dishType
}
type increaseDishCountACType = {
    type: typeof INCREASE_DISH_COUNT,
    dish: dishType
}
type reduceDishCountACType = {
    type: typeof REDUCE_DISH_COUNT,
    dish: dishType
}
type changeDishCountACType = {
    type: typeof CHANGE_DISH_COUNT,
    dish: dishType
    count: number
}
type removeDishACType = {
    type: typeof REMOVE_DISH,
    id: string
}
type clearBucketACType = {
    type: typeof CLEAR_BUCKET
}
type getDeliverySettingsACType = {
    type: typeof GET_DELIVERY_SETTINGS,
    settings: Array<deliverySettingsType>
}
type getDeliveryGlobalSettingsACType = {
    type: typeof GET_DELIVERY_GLOBAL_SETTINGS,
    settings: deliveryGlobalSettingsType
}
type changeDeliveryPostedACType = {
    type: typeof DELIVERY_POSTED,
    status: boolean
}

type changeOrderStatusACType = {
    type: typeof ORDER_STATUS
    status: string
}

type ActionType = addDishACType | increaseDishCountACType | reduceDishCountACType | changeDishCountACType
    | removeDishACType | clearBucketACType | getDeliverySettingsACType | getDeliveryGlobalSettingsACType | changeDeliveryPostedACType | changeOrderStatusACType

export const addDishAC = (dish: dishType): addDishACType => ({type: ADD_DISH, dish});
export const increaseDishCountAC = (dish: dishType): increaseDishCountACType => ({type: INCREASE_DISH_COUNT, dish});
export const reduceDishCountAC = (dish: dishType): reduceDishCountACType => ({type: REDUCE_DISH_COUNT, dish});
export const removeDishAC = (id: string): removeDishACType => ({type: REMOVE_DISH, id});
export const changeDishCountAC = (dish: dishType, count: number): changeDishCountACType => ({type: CHANGE_DISH_COUNT, dish, count});
export const clearBucketAC = (): clearBucketACType => ({type: CLEAR_BUCKET});
export const changeDeliveryPostedAC = (status: boolean): changeDeliveryPostedACType => ({type: DELIVERY_POSTED, status});
export const changeOrderStatusAC = (status: string): changeOrderStatusACType => ({type: ORDER_STATUS, status});
const getDeliverySettingsAC = (settings: Array<deliverySettingsType>): getDeliverySettingsACType => ({type: GET_DELIVERY_SETTINGS, settings});
const getDeliveryGlobalSettingsAC = (settings: deliveryGlobalSettingsType): getDeliveryGlobalSettingsACType => ({type: GET_DELIVERY_GLOBAL_SETTINGS, settings});

export const requestDeliverySettings = () => async(dispatch: any) => {
    let response = await bucketAPI.getDeliverySettings()
    dispatch(getDeliverySettingsAC(response.data))
};

export const requestGlobalDeliverySettings = () => async(dispatch: any) => {
    let response = await bucketAPI.getDeliveryGlobalSettings()
    dispatch(getDeliveryGlobalSettingsAC(response.data))
};

export const postOrder = (order: IDeliveryPost) => async(dispatch: any) => {
    let response = await bucketAPI.postOrder(order)
    if (response.status === 201 || response.status === 200) {
        dispatch(changeOrderStatusAC('created'))
        dispatch(changeDeliveryPostedAC(true))
        dispatch(clearBucketAC())
    } else {
        dispatch(changeOrderStatusAC('error'))
    }
}

export default bucketReducer;