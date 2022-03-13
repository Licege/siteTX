import {createDraftSafeSelector} from '@reduxjs/toolkit'

const selector = state => state.newsPage

export const getAllNews = createDraftSafeSelector(selector, news => news.news)
export const getCurrentNews = createDraftSafeSelector(selector, news => news.currentNews)
export const getNewsLoadingStatus = createDraftSafeSelector(selector, news => news.isFetching)
export const getNewsTotal = createDraftSafeSelector(selector, news => news.totalCount)