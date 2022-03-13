import React from 'react'
import {useHeaderVacanciesLogic} from './logic'
import {PageHeader} from '../../../styledComponents/components'

const Header = () => {
  const {redirectToCreateVacancy} = useHeaderVacanciesLogic()

  return (
    <PageHeader title='Вакансии'>
      <button className="btn btn-primary" onClick={redirectToCreateVacancy}>Добавить вакансию</button>
    </PageHeader>
  )
}

export default Header