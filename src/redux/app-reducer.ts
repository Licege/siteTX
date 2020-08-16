const TOGGLE_MOBILE_MENU = 'APP/TOGGLE_MOBILE_MENU'

let initialState = {
    isOpen: false
}

type InitialState = typeof initialState

const appReducer = (state = initialState, action: ActionType): InitialState => {
    switch (action.type) {
        case TOGGLE_MOBILE_MENU:
            return { ...state, isOpen: !state.isOpen }
        default:
            return state
    }
}

type ToggleMobileMenu = { type: typeof TOGGLE_MOBILE_MENU }
export const toggleMobileMenu = () => ({ type: TOGGLE_MOBILE_MENU })

type ActionType = ToggleMobileMenu

export default appReducer
