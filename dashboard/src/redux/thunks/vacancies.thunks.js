import {createAsyncThunk} from '@reduxjs/toolkit'
import {vacancyAPI} from '../../api/api'

export const requestVacancies = createAsyncThunk(
  'vacancies/fetchAllVacancies',
  async () => {
    const response = await vacancyAPI.getVacancies()
    return response
  }
)

export const requestVacancy = createAsyncThunk(
  'vacancies/fetchVacancyById',
  async (id) => {
    const response = await vacancyAPI.getVacancy(id)
    return response
  }
)

export const createNewVacancy = createAsyncThunk(
  'vacancies/createVacancy',
  async (vacancy) => {
    const response = await vacancyAPI.createVacancy(vacancy)
    return response
  }
)

export const updateVacancy = createAsyncThunk(
  'vacancies/updateVacancy',
  async (vacancy) => {
    const id = vacancy.get('id')
    console.log(id)
    console.log(vacancy)
    const response = await vacancyAPI.updateVacancy(vacancy, id)
    return response
  }
)

export const deleteVacancy = createAsyncThunk(
  'vacancies/deleteVacancy',
  async (id) => {
    const response = await vacancyAPI.deleteVacancy(id)
    return response
  }
)