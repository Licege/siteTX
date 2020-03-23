import {deliveryType, dishType, orderDishType} from "../types/types";

const ADD_DISH = 'BUCKET/ADD_DISH';
const INCREASE_DISH = 'BUCKET/INCREASE_DISH';
const REDUCE_DISH = 'BUCKET/REDUCE_DISH';
const REMOVE_DISH = 'BUCKET/REMOVE_DISH';
const CLEAR_BUCKET = 'BUCKET/CLEAR';

let initialState = {
    delivery: {
        order: [] as Array<orderDishType>,
        totalPrice: 0
    } as deliveryType
};

type initialStateType = typeof initialState;

const bucketReducer = (state = initialState, action: ActionType): initialStateType => {
    let order = [];
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

        case INCREASE_DISH:
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

        case REDUCE_DISH:
            let count = state.delivery.order.find(o => o.id === action.dish.id)?.count; count = count ? count - 1 : -1;
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

        default:
            return state;
    }
};

type addDishACType = {
    type: typeof ADD_DISH,
    dish: dishType
}
type increaseDishACType = {
    type: typeof INCREASE_DISH,
    dish: dishType
}
type reduceDishACType = {
    type: typeof REDUCE_DISH,
    dish: dishType
}
type removeDishACType = {
    type: typeof REMOVE_DISH,
    id: number
}
type clearBucketACType = {
    type: typeof CLEAR_BUCKET
}
type ActionType = addDishACType | increaseDishACType | reduceDishACType | removeDishACType | clearBucketACType

export const addDishAC = (dish: dishType): addDishACType => ({type: ADD_DISH, dish});
export const increaseDishAC = (dish: dishType): increaseDishACType => ({type: INCREASE_DISH, dish});
export const reduceDishAC = (dish: dishType): reduceDishACType => ({type: REDUCE_DISH, dish});
export const removeDishAC = (id: number): removeDishACType => ({type: REMOVE_DISH, id});
export const clearBucketAC = (): clearBucketACType => ({type: CLEAR_BUCKET});

export default bucketReducer;