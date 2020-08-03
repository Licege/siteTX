import React from 'react'
import { vacancyType } from '../../types/types'
import CardVacancy from '../common/elements/CardVacancy'

type PropsType = {
    vacancies: Array<vacancyType>
}

const Vacancies: React.FC<PropsType> = ( {vacancies} ) => {
    return (
        <main className='page-container'>
            <h1 className='page-container-title'>~ Вакансии ~</h1>
            <div className='vacancies-container'>
                {vacancies.map(vacancy =>
                    <CardVacancy vacancy={vacancy} key={vacancy._id}/>,
                )}
            </div>
        </main>
    )
}

export default Vacancies
