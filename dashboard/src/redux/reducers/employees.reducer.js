import { createSlice } from '@reduxjs/toolkit'
import {
    fetchAllEmployees,
    fetchCurrentEmployee,
    createNewEmployee,
    updateCurrentEmployee,
    deleteEmployee
} from '../thunks/employees.thunks'

const employeesSlice = createSlice({
    name: 'employee',
    initialState: {
        currentEmployee: null,
        employees: [],
        total: 0
    },
    reducers: {},
    extraReducers: {
        [fetchAllEmployees.fulfilled]: (state, action) => {
            state.employees = action.payload.data
            state.total = action.payload.total
        },
        [fetchAllEmployees.rejected]: (state, action) => {
            console.log('rejected', action.payload)
        },
        [fetchCurrentEmployee.fulfilled]: (state, action) => {
            state.currentEmployee = action.payload
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
