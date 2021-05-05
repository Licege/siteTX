import { createAsyncThunk } from "@reduxjs/toolkit";
import { vacanciesAPI } from '../../api/api';
import { resumeType } from '../../types/types';

export const requestVacancies = createAsyncThunk(
  'vacancies/fetchAllNews',
  async () => {
      const response = await vacanciesAPI.getVacancies()
      return response
  }
)

export const postResume = createAsyncThunk(
  'vacancies/postNewResume',
  async (resume: resumeType) => {
      const response = await vacanciesAPI.postResume(resume)
      return response
  }
)

// import { ThunkAction } from 'redux-thunk';
// import { ActionsTypes, actions } from '../actions/vacancies.actions'
// import { AppStateType } from '../redux-store';
// import { Dispatch } from 'redux';
// import { vacanciesAPI } from '../../api/api';
// import { resumeType } from '../../types/types';
//
// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
//
// export const getVacancies = (): ThunkType => {
//     return async (dispatch: Dispatch<ActionsTypes>) => {
//         let response = await vacanciesAPI.getVacancies()
//         dispatch(actions.getVacancies(response.data))
//     }
// }
//
// export const postResume = (resume: resumeType): ThunkType => {
//     return async (dispatch: Dispatch<ActionsTypes>) => {
//         await vacanciesAPI.postResume(resume)
//         dispatch(actions.saveResume(resume))
//     }
// }