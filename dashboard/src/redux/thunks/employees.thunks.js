import { createAsyncThunk } from '@reduxjs/toolkit'
import { employeesAPI } from '../../api/api'

const { getEmployees } = employeesAPI

export const fetchAllEmployees = createAsyncThunk(
  'employees/fetchAllEmployees',
  () => {
    return getEmployees().then(response => {
      console.log(response)
      return Promise.resolve(response.data)
    }).catch(reason => {
      console.log(reason)
      return Promise.reject(reason)
    })
    // const response = await employeesAPI.getEmployees()
    // console.log(response)
    // return response.data
  }
)

export const fetchAllProfessions = createAsyncThunk(
  'employees/fetchAllProfessions',
  async () => {
    const response = await employeesAPI.getProfessions()
    return response
  }
)

export const createNewEmployee = createAsyncThunk(
  'employees/createNewEmployee',
  async (profile) => {
    const response = await employeesAPI.createEmployee(profile)
    return response
  }
)

export const fetchCurrentEmployee = createAsyncThunk(
  'employees/fetchEmployeeById',
  async (id) => {
    const response = await employeesAPI.getEmployeeById(id)
    return response
  }
)

export const updateCurrentEmployee = createAsyncThunk(
  'employees/updateEmployeeById',
  async (profile) => {
    const response = await employeesAPI.updateEmployee(profile)
    return response
  }
)

export const deleteEmployee = createAsyncThunk(
  'employees/deleteEmployeeById',
  async (id) => {
    const response = await employeesAPI.deleteEmployee(id)
    return response
  }
)