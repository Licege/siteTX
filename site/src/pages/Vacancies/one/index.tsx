import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet';
import { Button, PageContainer } from '../../../components/core'
import { useCurrentVacancyPageLogic } from './logic'
import { BREAKPOINTS } from '../../../styledComponents/helpers'
import altImg from '../../../static/img/female_cook.png'
import { TextHtml } from '../../../styledComponents/components';


const VacancyById = () => {
  const { currentVacancy, redirectToAllVacancies } = useCurrentVacancyPageLogic()
  const { title, description, imageSrc } = currentVacancy

  return (
    <PageContainer>
      <Helmet title={currentVacancy.title} />
      <VacancyContainer>
        <Image src={imageSrc || altImg} alt=""/>
        <VacancyWrapper>
          <Title>{title}</Title>
          {description && <TextHtml dangerouslySetInnerHTML={{ __html: description }} />}
          <ActionsBlock>
            <Button variant="outlined" onClick={redirectToAllVacancies}>Смотреть все вакансии</Button>
          </ActionsBlock>
        </VacancyWrapper>
      </VacancyContainer>
    </PageContainer>
  )
}

const VacancyContainer = styled.div`
  &:after {
    content: " ";
    display: table;
    clear: both;
  }
`

const Image = styled.img`
  float: left;
  width: 45%;
  height: 100%;
  margin: 0 16px 8px 36px;
  border-radius: 5px;

  @media (max-width: ${BREAKPOINTS.ts}px) {
    margin: 0 0 16px;
    width: 100%;
  }
`

const VacancyWrapper = styled.div`
  position: relative;
  padding-bottom: 40px;
  padding-left: 36px;

  @media(max-width: ${BREAKPOINTS.ts}px) {
    padding: 0;
  }
`

const Title = styled.h2`
  text-align: center;
`

const ActionsBlock = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`

export default VacancyById
