import { AppStateType } from '../redux-store'
import { profileType, ordersHistoryType } from '../../types/types';

export const getMeSelector = (state: any): profileType => {
    return state.profilePage.me
}

export const getMyOrdersHistory = (state: any): ordersHistoryType[] => {
    return state.profilePage.ordersHistory
}