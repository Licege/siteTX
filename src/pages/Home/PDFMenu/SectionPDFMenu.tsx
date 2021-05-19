import React from 'react'
import styled from 'styled-components'
import { SectionTitle, SectionWrapper } from '../../../components/core'
import PDFMenu from './PDFMenu'
import PDFBar from './PDFBar'
import CardContainer from './CardContainer'

const SectionPDFMenu = () => (
    <SectionWrapper>
      <SectionTitle>Меню ресторана</SectionTitle>
      <SectionContent>
        <CardContainer title='Основное меню'>
          <PDFMenu />
        </CardContainer>
        <CardContainer title='Карта бара'>
          <PDFBar />
        </CardContainer>
      </SectionContent>
    </SectionWrapper>
  )

const SectionContent = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-auto-flow: column;
  grid-template-columns: repeat(2, minmax(500px, 1fr));
  justify-content: space-between;
  margin: 25px 0;
  
  @media(max-width: 768px) {
    display: block;
  }
`

export default SectionPDFMenu