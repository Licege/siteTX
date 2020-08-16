import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ResumeForm from './ResumeForm'
import { getMyResumeSelector } from '../../../redux/selectors/vacancies'


const Resume: React.FC = () => {
    let resume = useSelector(getMyResumeSelector)

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
                <ResumeForm onSubmit={postResume} initialValues={resume}/>
            </div>
        </main>
    )
}

export default Resume
