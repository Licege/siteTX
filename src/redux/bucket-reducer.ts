import {dishType, orderDishType} from "../types/types";

const ADD_DISH = 'BUCKET/ADD_DISH';
const INCREASE_DISH = 'BUCKET/INCREASE_DISH';
const REDUCE_DISH = 'BUCKET/REDUCE_DISH';
const REMOVE_DISH = 'BUCKET/REMOVE_DISH';
const CLEAR_BUCKET = 'BUCKET/CLEAR';

let initialState = {
    order: [] as Array<orderDishType>
};

type initialStateType = typeof initialState;

const bucketReducer = (state = initialState, action: ActionType): initialStateType => {
    switch(action.type) {

        case ADD_DISH:
            let index = state.order.findIndex(item => item.id === action.id);
            return { ...state, order: index !== -1 ?
                    state.order.map(order => (order.id === action.id ? {id: order.id, count: order.count + 1} : order ))
                    : [...state.order, {id: action.id, count: 1} ] };

        case INCREASE_DISH:
            return { ...state, order: state.order.map(order => (order.id === action.id) ? {id: order.id, count: order.count + 1} : order) };

        case REDUCE_DISH:
            let count = state.order.find(o => o.id === action.id)?.count;  count = count ? count - 1 : -1;
            return  { ...state, order: count === 0
                    ? state.order.filter(dish => dish.id !== action.id)
                    : state.order.map(order => (order.id === action.id) ? {id: order.id, count: order.count - 1} : order) };

        case REMOVE_DISH:
            return { ...state, order: state.order.filter(dish => dish.id !== action.id) };

        case CLEAR_BUCKET:
            return { ...state, order: [] };

        default:
            return state;
    }
};

type addDishACType = {
    type: typeof ADD_DISH,
    id: number
}
type increaseDishACType = {
    type: typeof INCREASE_DISH,
    id: number
}
type reduceDishACType = {
    type: typeof REDUCE_DISH,
    id: number
}
type removeDishACType = {
    type: typeof REMOVE_DISH,
    id: number
}
type clearBucketACType = {
    type: typeof CLEAR_BUCKET
}
type ActionType = addDishACType | increaseDishACType | reduceDishACType | removeDishACType | clearBucketACType

export const addDishAC = (id: number): addDishACType => ({type: ADD_DISH, id});
export const increaseDishAC = (id: number): increaseDishACType => ({type: INCREASE_DISH, id});
export const reduceDishAC = (id: number): reduceDishACType => ({type: REDUCE_DISH, id});
export const removeDishAC = (id: number): removeDishACType => ({type: REMOVE_DISH, id});
export const clearBucketAC = (): clearBucketACType => ({type: CLEAR_BUCKET});

export default bucketReducer;