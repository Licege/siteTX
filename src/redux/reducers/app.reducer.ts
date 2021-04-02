import { ActionType } from '../actions/app.actions'

let initialState = {
    isOpen: false,
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

export default appReducer
