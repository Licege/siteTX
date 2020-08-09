import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardVacancy from '../common/elements/CardVacancy'
import { getVacanciesSelector } from '../../redux/selectors/vacancies'
import { getVacancies } from '../../redux/vacancies-reducer'


const Vacancies: React.FC = () => {
    useEffect(() => {
        document.title = 'Вакансии'
        window.scrollTo(0, 0)
    })

    let vacancies = useSelector(getVacanciesSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getVacancies())
    }, [dispatch])

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
