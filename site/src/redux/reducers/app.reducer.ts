import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: 'app',
    initialState: {
        isPhone: false
    },
    reducers: {
        toggleMobileMenu: state => { state.isPhone = !state.isPhone }
    }
})

export const { toggleMobileMenu } = appSlice.actions

export default appSlice.reducer

// import { ActionType } from '../actions/app.actions'
//
// let initialState = {
//     isOpen: false,
// }
//
// type InitialState = typeof initialState
//
// const appReducer = (state = initialState, action: ActionType): InitialState => {
//     switch (action.type) {
//         case 'APP/TOGGLE_MOBILE_MENU':
//             return { ...state, isOpen: !state.isOpen }
//         default:
//             return state
//     }
// }
//
// export default appReducer
