import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { AppStateType } from '../redux-store';

const selector = (state: AppStateType) => state.vacanciesPage

export const getVacancies = createDraftSafeSelector(selector, state => state.vacancies)
export const getCurrentVacancy = createDraftSafeSelector(selector, state => state.currentVacancy)
export const getMyResume = createDraftSafeSelector(selector, state => state.resume)