import { createDraftSafeSelector } from '@reduxjs/toolkit'

const selector = state => state.staffPositions

export const getAllStaffPositions = createDraftSafeSelector(selector, state => state.positions)