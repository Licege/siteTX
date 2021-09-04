import { createAsyncThunk } from '@reduxjs/toolkit'
import { employeesAPI, staffPositionsAPI } from '../../api/api'

export const fetchAllEmployees = createAsyncThunk(
  'employees/fetchAllEmployees',
  async (params, { rejectWithValue }) => {
    try {
      return await employeesAPI.getEmployees(params);
    } catch (e) {
      return rejectWithValue({ status: e.status })
    }
  }
)

export const createNewEmployee = createAsyncThunk(
  'employees/createNewEmployee',
  async (profile, { rejectWithValue }) => {
    try {
      return await employeesAPI.createEmployee(profile)
    } catch (e) {
      return rejectWithValue({ status: e.status })
    }
  }
)

export const fetchCurrentEmployee = createAsyncThunk(
  'employees/fetchEmployeeById',
  async (id, { rejectWithValue }) => {
    try {
      return await employeesAPI.getEmployeeById(id)
    } catch (e) {
      return rejectWithValue({ status: e.status })
    }
  }
)

export const updateCurrentEmployee = createAsyncThunk(
  'employees/updateEmployeeById',
  async (profile, { rejectWithValue }) => {
    try {
      return await employeesAPI.updateEmployee(profile)
    } catch (e) {
      return rejectWithValue({ status: e.status })
    }
  }
)

export const deleteEmployee = createAsyncThunk(
  'employees/deleteEmployeeById',
  async (id, { rejectWithValue }) => {
    try {
      return await employeesAPI.deleteEmployee(id)
    } catch (e) {
      return rejectWithValue({ status: e.status })
    }
  }
)