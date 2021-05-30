import { createSlice } from '@reduxjs/toolkit'
import { fetchAllEmployees, fetchAllProfessions, fetchCurrentEmployee, createNewEmployee, updateCurrentEmployee, deleteEmployee } from '../thunks/employees.thunks'

const employeesSlice = createSlice({
    name: 'employee',
    initialState: {
        newEmployee: null,
        currentEmployee: null,
        employees: [],
        professions: [],
    },
    reducers: {},
    extraReducers: {
        [fetchAllEmployees.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.employees = action.payload
        },
        [fetchAllEmployees.rejected]: (state, action) => {
            console.log('rejected', action.payload)
        },
        [fetchCurrentEmployee.fulfilled]: (state, action) => {
            state.currentEmployee = action.payload
        },
        [fetchAllProfessions.fulfilled]: (state, action) => {
            state.professions = action.payload
        },
        [createNewEmployee.fulfilled]: (state, action) => {
            state.employees.push(action.payload)
        },
        [updateCurrentEmployee.fulfilled]: (state, action) => {
            state.employees = state.employees.map(e => e.id === action.payload.id ? action.payload : e)
        },
        [deleteEmployee.fulfilled]: (state, action) => {
            state.employees = state.employees.filter(employee => employee.id !== action.id)
        }
    }
})

export default employeesSlice.reducer
