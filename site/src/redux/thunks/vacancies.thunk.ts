import { createAsyncThunk } from '@reduxjs/toolkit';
import { vacanciesAPI } from '../../api/api';
import { resumeType } from '../../types/types';

export const requestVacancies = createAsyncThunk(
  'vacancies/fetchAllNews',
  async () => vacanciesAPI.getVacancies()
)

export const postResume = createAsyncThunk(
  'vacancies/postNewResume',
  async (resume: resumeType) => vacanciesAPI.postResume(resume)
)