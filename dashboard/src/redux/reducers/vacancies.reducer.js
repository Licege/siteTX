import { createSlice } from '@reduxjs/toolkit'
import { requestVacancies, requestVacancy, createNewVacancy, updateVacancy, deleteVacancy } from '../thunks/vacancies.thunks'

const vacanciesSlice = createSlice({
    name: 'vacancies',
    initialState: {
        vacancies: [],
        newVacancy: null,
        currentVacancy: null,
        isFetching: false,
    },
    reducers: {},
    extraReducers: {
        [requestVacancies.pending]: state => {
            state.isFetching = true
        },
        [requestVacancies.fulfilled]: (state, action) => {
            state.vacancies = action.payload
            state.isFetching = false
        },
        [requestVacancies.rejected]: state => {
            state.isFetching = false
        },
        [requestVacancy.fulfilled]: (state, action) => {
            state.currentVacancy = action.payload
        },
        [createNewVacancy.pending]: state => {
            state.isFetching = true
        },
        [createNewVacancy.fulfilled]: (state, action) => {
            state.vacancies.push(action.payload)
            state.isFetching = false
        },
        [createNewVacancy.rejected]: state => {
            state.isFetching = false
        },
        [updateVacancy.fulfilled]: (state, action) => {
            state.vacancies = state.vacancies.map(vacancy => vacancy.id === action.vacancy.id ? action.vacancy : vacancy)
        },
        [deleteVacancy.fulfilled]: (state, action) => {
            state.vacancies = state.vacancies.filter(vacancy => vacancy.id !== action.payload)
        }
    }
})

export default vacanciesSlice.reducer
