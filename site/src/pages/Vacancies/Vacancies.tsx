import React from 'react'
import CardVacancy from '../../components/Cards/CardVacancy'
import EmptyPage from '../EmpyPage'
import { useVacanciesPageLogic } from './logic'
import { PageContainer, PageTitle } from '../../components/core'
import styled from 'styled-components'


const Vacancies = () => {
  const { vacancies } = useVacanciesPageLogic()

  if (!vacancies.length) return <EmptyPage />

  return (
    <PageContainer>
      <PageTitle>~ Вакансии ~</PageTitle>
      <Wrapper>
        {vacancies.map(vacancy =>
          <CardVacancy vacancy={vacancy} key={vacancy.id} />
        )}
      </Wrapper>
    </PageContainer>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
`

export default Vacancies
