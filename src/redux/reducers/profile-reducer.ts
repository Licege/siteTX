import { ActionsTypes } from '../actions/profile.actions'
import { profileType } from '../../types/types';

const initialState = {
    me: {} as profileType,
    ordersHistory: [] as any
}

type InitialState = typeof initialState

const profileReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case 'PROFILE/GET_ME':
            return { ...state, me: action.profile }
        case 'PROFILE/GET_MY_ORDERS_HISTORY':
            return { ...state, ordersHistory: action.orders }
        case 'PROFILE/CLEAR':
            return { ...state, me: {} as profileType, ordersHistory: [] }
        default:
            return state
    }
}

export default profileReducer