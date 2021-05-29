import { createDraftSafeSelector } from '@reduxjs/toolkit'

const selector = state => state.vacanciesPage

export const getAllVacancies = createDraftSafeSelector(selector, state => state.vacancies)
export const getCurrentVacancy = createDraftSafeSelector(selector, state => state.currentVacancy)