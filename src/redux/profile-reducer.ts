import { AppStateType, InferActionsTypes } from './redux-store';
import { Dispatch } from 'redux';
import { profileAPI } from '../api/api';
import { ThunkAction } from 'redux-thunk';
import { orderDishType, profileType } from '../types/types';


const initialState = {
    me: {} as profileType,
    ordersHistory: [] as any
}

const profileReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case 'PROFILE/GET_ME':
            return { ...state, me: action.profile }
        case 'PROFILE/GET_MY_ORDERS_HISTORY':
            return { ...state, ordersHistory: action.orders }
        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>;

const actions = {
    getMe: (profile: profileType) => ({ type: 'PROFILE/GET_ME', profile } as const),
    getOrdersHistory: (orders: Array<orderDishType>) => ({ type: 'PROFILE/GET_MY_ORDERS_HISTORY', orders } as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestMe = (): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        const response = await profileAPI.getMe()
        dispatch(actions.getMe(response.data))
    }
}

export const requestOrdersHistory = ():ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        const response = await profileAPI.getOrdersHistory()
        dispatch(actions.getOrdersHistory(response.data))
    }
}

export default profileReducer