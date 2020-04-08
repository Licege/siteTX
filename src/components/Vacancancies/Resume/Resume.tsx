import React from 'react'
import ResumeForm from './ResumeForm'
import {resumeType, vacancyType} from "../../../types/types";

type IProps = {
    resume: resumeType,
    vacancies: Array<vacancyType>
    id: string

    postResume: (data: any) => void
}

const Resume: React.FC<IProps> = ({resume, vacancies, id, postResume}) => {
    console.log(id)
    return (
        <div className='page-container'>
            <div className='page-container-title'>Резюме</div>
            <div>
                <ResumeForm onSubmit={postResume} vacancies={vacancies} initialValues={resume} />
            </div>
        </div>
    )
}

export default Resume;