import { AppStateType } from '../redux-store'
import { profileType, ordersHistoryType } from '../../types/types';

export const getMeSelector = (state: AppStateType): profileType => state.profilePage.me

export const getMyOrdersHistory = (state: AppStateType): ordersHistoryType[] => state.profilePage.ordersHistory