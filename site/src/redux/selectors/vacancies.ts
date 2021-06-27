import { AppStateType } from '../redux-store'

export const getVacanciesSelector = (state: AppStateType) => state.vacanciesPage.vacancies

export const getMyResumeSelector = (state: AppStateType) => state.vacanciesPage.resume
