import React from 'react'
import styled from 'styled-components'
import { SectionTitle, SectionWrapper } from '../../../components/core'
import CardContainer from './CardContainer'
import { BREAKPOINTS } from '../../../styledComponents/helpers'
import MenuGallery from './Menu';
import BarGallery from './Bar';

const SectionPDFMenu = () => (
  <SectionWrapper>
    <SectionTitle>Меню ресторана</SectionTitle>
    <SectionContent>
      <CardContainer title='Основное меню'>
        <MenuGallery />
      </CardContainer>
      <Divider />
      <CardContainer title='Карта бара'>
        <BarGallery />
      </CardContainer>
    </SectionContent>
  </SectionWrapper>
)

const SectionContent = styled.div`
  display: grid;
  grid-gap: 32px;
  grid-auto-flow: column;
  grid-template-columns: repeat(2, minmax(400px, max-content));
  justify-content: center;
  margin: 25px 0;
  
  @media(max-width: ${BREAKPOINTS.ds}px) {
    display: block;
  }
`

const Divider = styled.div`
  display: none;
  height: 32px;
  width: 100%;

  @media(max-width: ${BREAKPOINTS.ds}px) {
    display: block;
  }
`

export default SectionPDFMenu