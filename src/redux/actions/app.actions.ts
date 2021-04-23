// import { InferActionsTypes } from '../redux-store';

export type ActionType = any
export const actions = {
    toggleMobileMenu: () => ({ type: 'APP/TOGGLE_MOBILE_MENU' } as const),
}