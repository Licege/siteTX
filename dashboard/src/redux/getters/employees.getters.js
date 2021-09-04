import { createDraftSafeSelector } from '@reduxjs/toolkit'

const selector = state => state.employeesPage

export const getEmployees = createDraftSafeSelector(selector, state => state.employees)
export const getTotal = createDraftSafeSelector(selector, state => state.total)
export const getCurrentEmployee = createDraftSafeSelector(selector, state => state.currentEmployee)