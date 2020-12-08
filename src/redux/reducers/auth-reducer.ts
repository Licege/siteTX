import { ActionType } from '../actions/auth.actions'

const initialState = {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    isAuthenticated: !!localStorage.getItem('accessToken'),
}

const authReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case 'AUTH/REGISTRATION':
            return state
        case 'AUTH/LOGIN':
            localStorage.setItem('accessToken', action.data.accessToken)
            localStorage.setItem('refreshToken', action.data.refreshToken)
            return {
                ...state,
                isAuthenticated: true,
            }
        case 'AUTH/LOGOUT':
            localStorage.clear()
            return { ...state, isAuthenticated: false }
        default:
            return state
    }
}

export default authReducer
