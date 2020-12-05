import { AppStateType } from '../redux-store'
import { profileType, ordersHistoryType } from '../../types/types';

export const getMeSelector = (state: AppStateType): profileType => {
    return state.profilePage.me
}

export const getMyOrdersHistory = (state: AppStateType): ordersHistoryType[] => {
    return state.profilePage.ordersHistory
}