import { createSlice } from "@reduxjs/toolkit";
import { newsType } from '../../types/types'
import {requestCurrentNews, requestNews} from "../thunks/news.thunk";

const newsSlice = createSlice({
    name: 'news',
    initialState: {
        currentNews: {} as newsType,
        news: [] as Array<newsType>,
        totalCount: 0,
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(requestNews.fulfilled, (state, action) => {
            state.news = action.payload.news
            state.totalCount = action.payload.total_count
        })
        builder.addCase(requestCurrentNews.fulfilled, (state, action) => {
            state.currentNews = action.payload
        })
    }
})

export default newsSlice.reducer

// import { ActionsTypes } from '../actions/news.actions'
// import { newsType } from '../../types/types'
//
// let initialState = {
//     currentNews: {} as newsType,
//     news: [] as Array<newsType>,
//     totalCount: 0,
// }
//
// type InitialStateType = typeof initialState;
//
// const NewsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
//     switch (action.type) {
//         case 'NEWS/GET_NEWS':
//             return { ...state, news: action.news, totalCount: action.total_count }
//         case 'NEWS/GET_CURRENT_NEWS':
//             return { ...state, currentNews: action.currentNews }
//         default:
//             return state
//     }
// }
//
// export default NewsReducer
