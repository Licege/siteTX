import { authProfileType, authTokenType } from '../types/types'
import { authAPI } from '../api/api'
import { Dispatch } from 'redux'
import { InferActionsTypes } from './redux-store'

let initialState = {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    isAuthenticated: !!localStorage.getItem('accessToken'),
}

const authReducer = ( state = initialState, action: ActionType ) => {
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

type ActionType = InferActionsTypes<typeof actions>

export const actions = {
    registration: ( data: authTokenType ) => ({ type: 'AUTH/REGISTRATION', data } as const),
    login: ( data: authTokenType ) => ({ type: 'AUTH/LOGIN', data } as const),
    logout: () => ({ type: 'AUTH/LOGOUT' } as const)
}

export const registration = ( profile: authProfileType ) => async ( dispatch: Dispatch<ActionType> ) => {
    let response = await authAPI.registration(profile)
    dispatch(actions.registration(response.data))
}

export const login = ( profile: authProfileType ) => async ( dispatch: Dispatch<ActionType> ) => {
    let response = await authAPI.login(profile)
    dispatch(actions.login(response.data))
}

export const refresh = () => async ( dispatch: Dispatch<ActionType> ) => {
    await authAPI.refresh()
}

export default authReducer
