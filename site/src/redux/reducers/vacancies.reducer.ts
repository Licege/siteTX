import { createSlice } from "@reduxjs/toolkit";
import { resumeType, vacancyType } from '../../types/types'
import {requestVacancies} from "../thunks/vacancies.thunk";

const vacanciesSlice = createSlice({
    name: 'vacancies',
    initialState: {
        vacancies: [] as Array<vacancyType>,
        resume: {} as resumeType,
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(requestVacancies.fulfilled, (state, action) => { state.vacancies = action.payload })
    }
})

export default vacanciesSlice.reducer

// import { ActionsTypes } from '../actions/vacancies.actions'
// import { resumeType, vacancyType } from '../../types/types'
//
// let initialState = {
//     vacancies: [] as Array<vacancyType>,
//     resume: {} as resumeType,
// }
//
// type InitialStateType = typeof initialState;
//
// const vacanciesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
//     switch (action.type) {
//         case 'VACANCIES/GET_VACANCIES':
//             return { ...state, vacancies: action.vacancies }
//         default:
//             return state
//     }
// }
//
// export default vacanciesReducer
