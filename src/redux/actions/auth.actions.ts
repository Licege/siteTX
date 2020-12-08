import { InferActionsTypes } from '../redux-store';
import { authTokenType } from '../../types/types';

export const actions = {
    registration: (data: authTokenType) => ({ type: 'AUTH/REGISTRATION', data } as const),
    login: (data: authTokenType) => ({ type: 'AUTH/LOGIN', data } as const),
    logout: () => ({ type: 'AUTH/LOGOUT' } as const),
}

export type ActionType = InferActionsTypes<typeof actions>
