import {
    cityType,
    deliveryGlobalSettingsType,
    deliverySettingsType,
    deliveryType,
    dishType,
    orderDishType
} from "../types/types";
import {bucketAPI, cityAPI} from "../api/api";
import {getDishesKey} from "../plugins/helpers";

const ADD_DISH = 'BUCKET/ADD_DISH';
const INCREASE_DISH_COUNT = 'BUCKET/INCREASE_DISH_COUNT';
const REDUCE_DISH_COUNT = 'BUCKET/REDUCE_DISH_COUNT';
const CHANGE_DISH_COUNT = 'BUCKET/CHANGE_DISH_COUNT';
const REMOVE_DISH = 'BUCKET/REMOVE_DISH';
const CLEAR_BUCKET = 'BUCKET/CLEAR';

const GET_DELIVERY_SETTINGS = 'BUCKET/GET_DELIVERY_SETTINGS';
const GET_DELIVERY_GLOBAL_SETTINGS = 'BUCKET/GET_DELIVERY_GLOBAL_SETTINGS';

const GET_CITIES = 'BUCKET/GET_CITIES';

let initialState = {
    delivery: {
        order: [] as Array<orderDishType>,
        totalPrice: 0
    } as deliveryType,
    settings: [] as Array<deliverySettingsType>,
    global_settings: {} as deliveryGlobalSettingsType,
    cities: [] as Array<cityType>
};

type initialStateType = typeof initialState;

const bucketReducer = (state = initialState, action: ActionType): initialStateType => {
    let order = [];
    let count = 0;

    switch(action.type) {
        case ADD_DISH:
            let index = state.delivery.order.findIndex(item => item.id === action.dish.id);
            return {
                ...state,
                delivery: {
                    order: index !== -1 ?
                        state.delivery.order.map(order =>
                            (order.id === action.dish.id ? {
                                id: order.id,
                                count: order.count + 1,
                                price: action.dish.price * (order.count + 1)
                            } : order))
                        : [...state.delivery.order, {id: action.dish.id, count: 1, price: action.dish.price}],
                    totalPrice: state.delivery.totalPrice + action.dish.price,
                }
            };

        case INCREASE_DISH_COUNT:
            return {
                ...state,
                delivery: {
                    order: state.delivery.order.map(order =>
                        (order.id === action.dish.id) ? {
                            id: order.id,
                            count: order.count + 1,
                            price: order.price + action.dish.price
                        } : order),
                    totalPrice: state.delivery.totalPrice + action.dish.price
                }
            };

        case REDUCE_DISH_COUNT:
            count = getDishesKey(state.delivery.order, action.dish.id, 'count'); count = count ? count - 1 : -1;
            return {
                ...state,
                delivery: {
                    order: count === 0
                        ? state.delivery.order.filter(dish => dish.id !== action.dish.id)
                        : state.delivery.order.map(order => (order.id === action.dish.id) ? {
                            id: order.id,
                            count: order.count - 1,
                            price: order.price - action.dish.price
                        } : order),
                    totalPrice: state.delivery.totalPrice - action.dish.price
                }
            };

        case CHANGE_DISH_COUNT:
            count = getDishesKey(state.delivery.order, action.dish.id, 'count'); count = count ? count - 1 : -1;
            return {
                ...state,
                delivery: {
                    order: state.delivery.order.map(order => (order.id === action.dish.id) ? {
                        id: order.id,
                        count: action.count,
                        price: action.dish.price * action.count
                    } : order),
                    totalPrice: action.count > count
                        ? state.delivery.totalPrice + (action.count - 1 - count) * action.dish.price
                        : state.delivery.totalPrice - (count - action.count + 1) * action.dish.price
                }
            };

        case REMOVE_DISH:
            return {
                ...state,
                delivery: {
                    order: state.delivery.order.filter(dish => dish.id !== action.id),
                    totalPrice: state.delivery.totalPrice - state.delivery.order.find(dish => dish.id === action.id)!.price
                } };

        case CLEAR_BUCKET:
            return {
                ...state,
                delivery: {
                    order: [],
                    totalPrice: 0
                }
            };

        case GET_DELIVERY_SETTINGS:
            return {
                ...state, settings: action.settings
            };
        case GET_DELIVERY_GLOBAL_SETTINGS:
            return {
                ...state, global_settings: action.settings
            };
        case GET_CITIES:
            return {
                ...state, cities: action.cities
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
    id: number
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
type getCitiesACType = {
    type: typeof GET_CITIES,
    cities: Array<cityType>
}
type ActionType = addDishACType | increaseDishCountACType | reduceDishCountACType | changeDishCountACType
    | removeDishACType | clearBucketACType | getDeliverySettingsACType | getDeliveryGlobalSettingsACType | getCitiesACType

export const addDishAC = (dish: dishType): addDishACType => ({type: ADD_DISH, dish});
export const increaseDishCountAC = (dish: dishType): increaseDishCountACType => ({type: INCREASE_DISH_COUNT, dish});
export const reduceDishCountAC = (dish: dishType): reduceDishCountACType => ({type: REDUCE_DISH_COUNT, dish});
export const removeDishAC = (id: number): removeDishACType => ({type: REMOVE_DISH, id});
export const changeDishCountAC = (dish: dishType, count: number): changeDishCountACType => ({type: CHANGE_DISH_COUNT, dish, count})
export const clearBucketAC = (): clearBucketACType => ({type: CLEAR_BUCKET});
const getDeliverySettingsAC = (settings: Array<deliverySettingsType>): getDeliverySettingsACType => ({type: GET_DELIVERY_SETTINGS, settings});
const getDeliveryGlobalSettingsAC = (settings: deliveryGlobalSettingsType): getDeliveryGlobalSettingsACType => ({type: GET_DELIVERY_GLOBAL_SETTINGS, settings});
const getCitiesAC = (cities: Array<cityType>): getCitiesACType => ({type: GET_CITIES, cities});

export const requestDeliverySettings = () => async(dispatch: any) => {
    let response = await bucketAPI.getDeliverySettings();
    dispatch(getDeliverySettingsAC(response));
};

export const requestGlobalDeliverySettings = () => async(dispatch: any) => {
    let response = await bucketAPI.getDeliveryGlobalSettings();
    dispatch(getDeliveryGlobalSettingsAC(response))
};

export const requestCities = () => async(dispatch: any) => {
    let response = await cityAPI.getCities();
    dispatch(getCitiesAC(response))
};

export default bucketReducer;