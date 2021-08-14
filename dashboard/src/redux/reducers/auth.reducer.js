import { createSlice } from '@reduxjs/toolkit'
import { registration, login } from '../thunks/auth.thunks'

const LS_AUTH_KEY = 'isAuthenticated'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: localStorage.getItem(LS_AUTH_KEY) || false,
    },
    reducers: {
        logout: state => {
            localStorage.removeItem(LS_AUTH_KEY)
            state.isAuthenticated = false
        }
    },
    extraReducers: {
        [registration.fulfilled]: (state, action) => {},
        [login.fulfilled]: (state, action) => {
            localStorage.setItem(LS_AUTH_KEY, 'true')
            state.isAuthenticated = true
        }
    }
})

export const { logout } = authSlice.actions

export default authSlice.reducer
