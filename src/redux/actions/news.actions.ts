// import { InferActionsTypes } from '../redux-store';
import { newsType } from '../../types/types';

export type ActionsTypes = any

export const actions = {
    getNews: (news: Array<newsType>, total_count: number) => ({
        type: 'NEWS/GET_NEWS',
        news,
        total_count,
    } as const),
    getCurrentNews: (currentNews: newsType) => ({ type: 'NEWS/GET_CURRENT_NEWS', currentNews } as const),
}