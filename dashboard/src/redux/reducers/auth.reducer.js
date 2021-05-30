import { createSlice } from '@reduxjs/toolkit'
import { registration, login } from '../thunks/auth.thunks'


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: true,
    },
    reducers: {
        logout: state => { state.isAuthenticated = false }
    },
    extraReducers: {
        [registration.fulfilled]: (state, action) => {},
        [login.fulfilled]: (state, action) => {
            state.isAuthenticated = true
        }
    }
})

export const { logout } = authSlice.actions

export default authSlice.reducer
