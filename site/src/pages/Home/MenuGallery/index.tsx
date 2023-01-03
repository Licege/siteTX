import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { SectionTitle, SectionWrapper } from '../../../components/core'
import { useQuery } from '../../../hooks/useQuery';
import CardContainer from './CardContainer'
import { BREAKPOINTS } from '../../../styledComponents/helpers'
import MenuGallery from './Menu';
import BarGallery from './Bar';

const useScrollToMenu = (ref: React.MutableRefObject<HTMLElement | undefined>) => {
  const query = useQuery()

  useEffect(() => {
    if (ref.current && query.get('menu') === 'true') {
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100)
    }
  }, [Boolean(ref.current)])
}

const SectionPDFMenu = () => {
  const ref = useRef<HTMLElement>();

  useScrollToMenu(ref);
  
  return (
    <SectionWrapper ref={ref}>
      <SectionTitle>Меню ресторана</SectionTitle>
      <SectionContent>
        <CardContainer title='Основное меню'>
          <MenuGallery/>
        </CardContainer>
        <Divider/>
        <CardContainer title='Карта бара'>
          <BarGallery/>
        </CardContainer>
      </SectionContent>
    </SectionWrapper>
  )
}

const SectionContent = styled.div`
  display: grid;
  grid-gap: 32px;
  grid-auto-flow: column;
  grid-template-columns: repeat(2, minmax(400px, max-content));
  justify-content: center;
  margin: 16px 0;
  
  @media(max-width: ${BREAKPOINTS.ds}px) {
    display: block;
    margin: 0;
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