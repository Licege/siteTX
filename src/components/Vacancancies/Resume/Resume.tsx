import React from 'react'
import ResumeForm from './ResumeForm'
import { resumeType, vacancyType } from '../../../types/types'

type IProps = {
    resume: resumeType,
    vacancies: Array<vacancyType>
    id: string

    postResume: ( data: any ) => void
}

const Resume: React.FC<IProps> = ( {resume, vacancies, id, postResume} ) => {
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
