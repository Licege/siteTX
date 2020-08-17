import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { resumeType, vacancyType } from '../types/types'
import { vacanciesAPI } from '../api/api'
import { AppStateType, InferActionsTypes } from './redux-store'


let initialState = {
    vacancies: [] as Array<vacancyType>,
    resume: {} as resumeType,
}

type InitialStateType = typeof initialState;

const vacanciesReducer = ( state = initialState, action: ActionsTypes ): InitialStateType => {
    switch (action.type) {
        case 'VACANCIES/GET_VACANCIES':
            return { ...state, vacancies: action.vacancies }
        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

const actions = {
    getVacancies: ( vacancies: Array<vacancyType> ) => ({ type: 'VACANCIES/GET_VACANCIES', vacancies } as const),
    saveResume: ( resume: resumeType ) => ({ type: 'VACANCIES/SAVE_RESUME', resume } as const),
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getVacancies = (): ThunkType => {
    return async ( dispatch: Dispatch<ActionsTypes> ) => {
        let response = await vacanciesAPI.getVacancies()
        dispatch(actions.getVacancies(response.data))
    }
}

export const postResume = ( resume: resumeType ): ThunkType => {
    return async ( dispatch: Dispatch<ActionsTypes> ) => {
        await vacanciesAPI.postResume(resume)
        dispatch(actions.saveResume(resume))
    }
}

export default vacanciesReducer
