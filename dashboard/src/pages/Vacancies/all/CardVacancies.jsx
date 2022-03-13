import React from 'react'
import {useCardVacanciesLogic} from './logic'
import CardVacancy from '../../../components/common/element/CardVacancy'

const CardVacancies = () => {
  const {vacancies, redirectToChangeVacancy, removeVacancy} = useCardVacanciesLogic()

  return (
    vacancies.map((vacancy, key) => (
      <CardVacancy card={vacancy}
                   key={key}
                   change={redirectToChangeVacancy}
                   remove={removeVacancy}/>
    ))
  )
}

export default CardVacancies