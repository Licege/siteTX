import { InferActionsTypes } from '../redux-store';
import { orderDishType, profileType } from '../../types/types';

export type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
    getMe: (profile: profileType) => ({ type: 'PROFILE/GET_ME', profile } as const),
    getOrdersHistory: (orders: Array<orderDishType>) => ({ type: 'PROFILE/GET_MY_ORDERS_HISTORY', orders } as const),
    clear: () => ({ type: 'PROFILE/CLEAR' } as const)
}