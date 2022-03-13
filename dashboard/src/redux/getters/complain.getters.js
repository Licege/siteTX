import {createDraftSafeSelector} from '@reduxjs/toolkit'

const selector = state => state.complainsPage;

export const getComplains = createDraftSafeSelector(selector, state => state.complains)
export const getTotalComplains = createDraftSafeSelector(selector, state => state.totalCount)