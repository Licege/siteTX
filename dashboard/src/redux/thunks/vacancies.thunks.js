import { createAsyncThunk } from '@reduxjs/toolkit'
import { vacancyAPI } from '../../api/api'

export const requestVacancies = createAsyncThunk(
  'vacancies/fetchAllVacancies',
  async (_, { rejectWithValue }) => {
    try {
      return await vacancyAPI.getVacancies()
    } catch (e) {
      return rejectWithValue({ status: e.status })
    }
  }
)

export const requestVacancy = createAsyncThunk(
  'vacancies/fetchVacancyById',
  async (id, { rejectWithValue }) => {
    try {
      return await vacancyAPI.getVacancy(id)
    } catch (e) {
      return rejectWithValue({ status: e.status })
    }
  }
)

export const createNewVacancy = createAsyncThunk(
  'vacancies/createVacancy',
  async (vacancy, { rejectWithValue }) => {
    try {
      return await vacancyAPI.createVacancy(vacancy)
    } catch (e) {
      return rejectWithValue({ status: e.status })
    }
  }
)

export const updateVacancy = createAsyncThunk(
  'vacancies/updateVacancy',
  async (vacancy, { rejectWithValue }) => {
    try {
      return await vacancyAPI.updateVacancy(vacancy, vacancy.get('id'))
    } catch (e) {
      return rejectWithValue({ status: e.status })
    }
  }
)

export const deleteVacancy = createAsyncThunk(
  'vacancies/deleteVacancy',
  async (id, { rejectWithValue }) => {
    try {
      return await vacancyAPI.deleteVacancy(id)
    } catch (e) {
      return rejectWithValue({ status: e.status })
    }
  }
)