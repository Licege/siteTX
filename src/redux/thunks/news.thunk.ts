import { Dispatch } from 'redux';
import { ActionsTypes, actions } from '../actions/news.actions'
import { newsAPI } from '../../api/api';

export const requestNews = (page?: number) => async (dispatch: Dispatch<ActionsTypes>) => {
    let response = await newsAPI.getNews(page)
    dispatch(actions.getNews(response.data.news, response.data.total_count))
}

export const requestCurrentNews = (id: string) => async (dispatch: Dispatch<ActionsTypes>) => {
    let response = await newsAPI.getNewsById(id)
    dispatch(actions.getCurrentNews(response.data))
}