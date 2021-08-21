import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet';
import { Button, PageContainer } from '../../../components/core'
import { useCurrentVacancyPageLogic } from './logic'
import { BREAKPOINTS } from '../../../styledComponents/helpers'
import altImg from '../../../static/img/female_cook.png'
import { TextHtml } from '../../../styledComponents/components';


const VacancyById = () => {
  const { currentVacancy, redirectToAllVacancies, redirectToResume } = useCurrentVacancyPageLogic()
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
            <Button variant="outlined" onClick={redirectToAllVacancies}>Назад</Button>
            <Button variant='contained' color='primary' onClick={redirectToResume}>Откликнуться</Button>
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
  max-width: 45%;
  margin: 0 16px 8px 36px;
  border-radius: 5px;

  @media (max-width: ${BREAKPOINTS.ts}px) {
    margin: 0 0 16px;
    max-width: unset;
    width: 100%;
  }
`

const VacancyWrapper = styled.div`
  position: relative;
  padding-bottom: 40px;
  padding-left: 36px;

  @media(max-width: ${BREAKPOINTS.ts}px) {
    padding-left: 0;
  }
`

const Title = styled.h2`
  text-align: center;
`

const ActionsBlock = styled.div`
  display: flex;
  gap: 16px;
  position: absolute;
  bottom: 0;
  right: 0;

  @media(max-width: ${BREAKPOINTS.ts}px) {
    position: static;
    justify-content: space-evenly;
  }
`

export default VacancyById
