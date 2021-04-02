import { InferActionsTypes } from '../redux-store';

export type ActionType = InferActionsTypes<typeof actions>
export const actions = {
    toggleMobileMenu: () => ({ type: 'APP/TOGGLE_MOBILE_MENU' } as const),
}