import { InferActionsTypes } from '../redux-store';
import { resumeType, vacancyType } from '../../types/types';

export type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    getVacancies: (vacancies: Array<vacancyType>) => ({ type: 'VACANCIES/GET_VACANCIES', vacancies } as const),
    saveResume: (resume: resumeType) => ({ type: 'VACANCIES/SAVE_RESUME', resume } as const),
}