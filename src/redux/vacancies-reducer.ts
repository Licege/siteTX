import { resumeType, vacancyType } from '../types/types'
import { vacanciesAPI } from '../api/api'

const GET_VACANCIES = 'VACANCIES/GET_VACANCIES'
const SAVE_RESUME = 'VACANCIES/SAVE_RESUME'

let initialState = {
    vacancies: [] as Array<vacancyType>,
    resume: {} as resumeType,
}

type InitialStateType = typeof initialState;

const vacanciesReducer = ( state = initialState, action: any ): InitialStateType => {
    switch (action.type) {
        case GET_VACANCIES:
            return { ...state, vacancies: action.vacancies }
        default:
            return state
    }
}

type GetVacanciesACType = {
    type: typeof GET_VACANCIES
    vacancies: Array<vacancyType>
}

type SaveResumeACType = {
    type: typeof SAVE_RESUME
    resume: resumeType
}

const getVacanciesAC = ( vacancies: Array<vacancyType> ): GetVacanciesACType => ({ type: GET_VACANCIES, vacancies })
const saveResumeAC = ( resume: resumeType ): SaveResumeACType => ({ type: SAVE_RESUME, resume })

export const getVacancies = () => async ( dispatch: any ) => {
    let response = await vacanciesAPI.getVacancies()
    dispatch(getVacanciesAC(response.data))
}

export const postResume = ( resume: resumeType ) => async ( dispatch: any ) => {
    await vacanciesAPI.postResume(resume)
    dispatch(saveResumeAC(resume))
}

export default vacanciesReducer
