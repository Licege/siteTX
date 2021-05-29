import { createDraftSafeSelector } from '@reduxjs/toolkit'

const selector = state => state.employeesPage

export const getEmployees = createDraftSafeSelector(selector, state => state.employees)
export const getProfessions = createDraftSafeSelector(selector, state => state.professions)