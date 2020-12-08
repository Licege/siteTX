import { ActionsTypes } from '../actions/vacancies.actions'
import { resumeType, vacancyType } from '../../types/types'

let initialState = {
    vacancies: [] as Array<vacancyType>,
    resume: {} as resumeType,
}

type InitialStateType = typeof initialState;

const vacanciesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'VACANCIES/GET_VACANCIES':
            return { ...state, vacancies: action.vacancies }
        default:
            return state
    }
}

export default vacanciesReducer
