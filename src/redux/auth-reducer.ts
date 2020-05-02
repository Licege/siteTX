import {authProfileType, authTokenType} from "../types/types";
import {authAPI} from "../api/api";

const REGISTRATION = 'AUTH/REGISTRATION'
const LOGIN = 'AUTH/LOGIN'
const LOGOUT = 'AUTH/LOGOUT'

let initialState = {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    isAuthenticated: !!localStorage.getItem('accessToken')
}

const authReducer = (state = initialState, action: actionType) => {
    switch (action.type) {
        case REGISTRATION:
            return state;
        case LOGIN:
            localStorage.setItem('accessToken', action.data.accessToken)
            localStorage.setItem('refreshToken', action.data.refreshToken)
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGOUT:
            localStorage.clear()
            return {...state, isAuthenticated: false}
        default:
            return state
    }
}

type registrationACType = {
    type: typeof REGISTRATION
    data: authTokenType
}
type loginACType = {
    type: typeof LOGIN
    data: authTokenType
}
type logoutACType = {
    type: typeof LOGOUT
}

type actionType = registrationACType & loginACType & logoutACType

const registrationAC = (data: authTokenType): registrationACType => ({type: REGISTRATION, data})
const loginAC = (data: authTokenType): loginACType => ({type: LOGIN, data})
export const logoutAC = (): logoutACType => ({type: LOGOUT})

export const registration = (profile: authProfileType) => async (dispatch: any) => {
    let response = await authAPI.registration(profile)
    dispatch(registrationAC(response.data))
}

export const login = (profile: authProfileType) => async (dispatch: any) => {
    let response = await authAPI.login(profile)
    dispatch(loginAC(response.data))
}

export const refresh = () => async (dispatch: any) => {
   await authAPI.refresh()
}

export default authReducer;