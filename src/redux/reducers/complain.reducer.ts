import { createSlice } from "@reduxjs/toolkit";
import {requestComplainTypes} from "../thunks/complain.thunk";
import { selectOptionsType } from '../../types/types';

const complainSlice = createSlice({
    name: 'complain',
    initialState: {
        complainTypes: [] as selectOptionsType[],
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(requestComplainTypes.fulfilled, (state, action) => {
            state.complainTypes = action.payload
        })
    }
})

export default complainSlice.reducer

// import { ActionsTypes } from '../actions/complain.actions'
// import { selectOptionsType } from '../../types/types';
//
// const initialState = {
//     complainTypes: [] as selectOptionsType[],
// }
//
// export type InitialState = typeof initialState
//
// const complainReducer = (state = initialState, action: ActionsTypes): InitialState => {
//     switch (action.type) {
//         case 'COMPLAIN/GET_COMPLAIN_TYPES':
//             return {
//                 ...state,
//                 complainTypes: action.complainTypes.map(({ id, title }: any) => ({ value: id, label: title }))
//             }
//         default:
//             return state
//     }
// }
//
// export default complainReducer