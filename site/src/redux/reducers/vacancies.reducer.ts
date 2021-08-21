import { createSlice } from '@reduxjs/toolkit';
import { resumeType, vacancyType } from '../../types/types'
import { requestCurrentVacancy, requestVacancies } from '../thunks/vacancies.thunk';

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState: {
    vacancies: [] as Array<vacancyType>,
    currentVacancy: {} as vacancyType,
    resume: {} as resumeType,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(requestVacancies.fulfilled, (state, action) => { 
      state.vacancies = action.payload 
    })
    
    builder.addCase(requestCurrentVacancy.fulfilled, (state, action) => {
      state.currentVacancy = action.payload
    })
  }
})

export default vacanciesSlice.reducer
