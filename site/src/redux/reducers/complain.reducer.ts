import { createSlice } from "@reduxjs/toolkit";
import { requestComplainTypes, requestComplain } from "../thunks/complain.thunk";
import { complainTypeType } from '../../types/types';
import { successSendCase, rejectSendCase } from '../../useCases/complain/send'

const complainSlice = createSlice({
    name: 'complain',
    initialState: {
        complainTypes: [] as complainTypeType[],
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(requestComplainTypes.fulfilled, (state, action) => {
            state.complainTypes = action.payload
        })
        builder.addCase(requestComplainTypes.pending, (state, action) => {
            console.log('pending')
        })
        builder.addCase(requestComplain.fulfilled, (s, a) => {
            successSendCase()
        })
        builder.addCase(requestComplain.rejected, () => {
            rejectSendCase()
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