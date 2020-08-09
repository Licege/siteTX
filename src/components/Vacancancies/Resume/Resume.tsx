import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ResumeForm from './ResumeForm'
import { getMyResumeSelector, getVacanciesSelector } from '../../../redux/selectors/vacancies'


const Resume: React.FC = () => {
    let resume = useSelector(getMyResumeSelector)
    let vacancies = useSelector(getVacanciesSelector)
    let { id } = useParams()

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
                <ResumeForm onSubmit={postResume} vacancies={vacancies} initialValues={resume}/>
            </div>
        </main>
    )
}

export default Resume
