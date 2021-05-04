import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardVacancy from '../../components/Cards/CardVacancy'
import { getVacanciesSelector } from '../../redux/selectors/vacancies'
import { requestVacancies } from '../../redux/thunks/vacancies.thunk'
import EmptyPage from '../empyPage';


const Vacancies: React.FC = () => {
    useEffect(() => {
        document.title = 'Вакансии'
        window.scrollTo(0, 0)
    })

    let vacancies = useSelector(getVacanciesSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestVacancies())
    }, [dispatch])

    if (!vacancies.length) return <EmptyPage />

    return (
        <main className='page-container'>
            <h1 className='page-container-title'>~ Вакансии ~</h1>
            <div className='vacancies-container'>
                {vacancies.map((vacancy: any) =>
                    <CardVacancy vacancy={vacancy} key={vacancy.id}/>,
                )}
            </div>
        </main>
    )
}

export default Vacancies
