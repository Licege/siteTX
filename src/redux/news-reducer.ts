import { newsType } from '../types/types'
import { newsAPI } from '../api/api'
import { Dispatch } from 'redux'

const GET_NEWS = 'NEWS/GET_NEWS'
const GET_CURRENT_NEWS = 'NEWS/GET_CURRENT_NEWS'

let initialState = {
    currentNews: {} as newsType,
    news: [] as Array<newsType>,
    totalCount: 0,
}

type InitialStateType = typeof initialState;

const NewsReducer = ( state = initialState, action: ActionType ): InitialStateType => {
    switch (action.type) {
        case GET_NEWS:
            return { ...state, news: action.news, totalCount: action.total_count }
        case GET_CURRENT_NEWS:
            return { ...state, currentNews: action.currentNews }
        default:
            return state
    }
}

type getCurrentNewsACType = {
    type: typeof GET_CURRENT_NEWS,
    currentNews: newsType
}

type getNewsACType = {
    type: typeof GET_NEWS,
    news: Array<newsType>
    total_count: number
}

type ActionType = getNewsACType | getCurrentNewsACType

const getNewsAC = ( news: Array<newsType>, total_count: number ): getNewsACType => ({
    type: GET_NEWS,
    news,
    total_count,
})
const getCurrentNewsAC = ( currentNews: newsType ): getCurrentNewsACType => ({ type: GET_CURRENT_NEWS, currentNews })

export const requestNews = ( page?: number | undefined ) => async ( dispatch: Dispatch<ActionType> ) => {
    let response = await newsAPI.getNews(page)
    dispatch(getNewsAC(response.data.news, response.data.total_count))
}

export const requestCurrentNews = ( id: string ) => async ( dispatch: Dispatch<ActionType> ) => {
    let response = await newsAPI.getNewsById(id)
    dispatch(getCurrentNewsAC(response.data))
}

export default NewsReducer
