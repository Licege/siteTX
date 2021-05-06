import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ResumeForm from './ResumeForm'
import { getMyResumeSelector, getVacanciesSelector } from '../../../redux/selectors/vacancies'
import { getMeSelector } from '../../../redux/selectors/profile';
import { isNil } from '../../../plugins/helpers';


const Resume: React.FC = () => {
    const me = useSelector(getMeSelector)
    const resume = useSelector(getMyResumeSelector)
    const vacancies = useSelector(getVacanciesSelector)

    const initialValues = !isNil(resume) ? resume : me

    useEffect(() => {
        window.scroll(0, 0)
    })

    const postResume = ( data: any ) => {
        console.log(data)
    }

    return (
        <main className='page-container'>
            <div className='page-container-title'>Резюме</div>
            <div>
                <ResumeForm onSubmit={postResume} initialValues={initialValues} vacancies={vacancies} />
            </div>
        </main>
    )
}

export default Resume
