import { InferActionsTypes } from './redux-store'

let initialState = {
    isOpen: false
}

type InitialState = typeof initialState

const appReducer = (state = initialState, action: ActionType): InitialState => {
    switch (action.type) {
        case 'APP/TOGGLE_MOBILE_MENU':
            return { ...state, isOpen: !state.isOpen }
        default:
            return state
    }
}

type ActionType = InferActionsTypes<typeof actions>
export const actions = {
    toggleMobileMenu: () => ({ type: 'APP/TOGGLE_MOBILE_MENU' } as const)
}

export default appReducer
