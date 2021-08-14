import { createAsyncThunk } from '@reduxjs/toolkit'
import { employeesAPI } from '../../api/api'

export const fetchAllEmployees = createAsyncThunk(
  'employees/fetchAllEmployees',
  async (_, { rejectWithValue }) => {
    try {
      return await employeesAPI.getEmployees();
    } catch (e) {
      return rejectWithValue({ status: e.status })
    }
  }
)

export const fetchAllProfessions = createAsyncThunk(
  'employees/fetchAllProfessions',
  async (_, { rejectWithValue }) => {
    try {
      return await employeesAPI.getProfessions()
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