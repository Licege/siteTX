import { createAsyncThunk } from '@reduxjs/toolkit';
import { vacanciesAPI } from '../../api/api';
import { resumeType } from '../../types/types';

export const requestVacancies = createAsyncThunk(
  'vacancies/fetchAllVacancies',
  async () => vacanciesAPI.getVacancies()
)

export const requestCurrentVacancy = createAsyncThunk(
  'vacancies/fetchVacancyById',
  async (id: string) => vacanciesAPI.getVacancyById(id)
)

export const postResume = createAsyncThunk(
  'vacancies/postNewResume',
  async (resume: resumeType) => vacanciesAPI.postResume(resume)
)