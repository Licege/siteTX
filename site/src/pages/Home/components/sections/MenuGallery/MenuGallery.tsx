import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { SectionTitle, SectionWrapper } from '@/components/core'
import { useQuery } from '@/hooks/useQuery';
import { BREAKPOINTS } from '@/styledComponents/helpers'
import CardContainer from './CardContainer'
import MenuDocumentCard from './MenuDocumentCard'
import { useMenuDocuments } from './useMenuDocuments'
import menuImg from '@/static/img/menu.jpg'
import barImg from '@/static/img/bar.jpg'
import banquetImg from '@/static/img/banquet.jpg'

const { hostname } = window.location

const fallbackMenuImages = Array.from({ length: 9 }, (_, index) =>
  `//${hostname}/uploads/menu-${String(index + 1).padStart(4, '0')}.webp`
)

const fallbackBarImages = Array.from({ length: 9 }, (_, index) =>
  `//${hostname}/uploads/bar-${String(index + 1).padStart(4, '0')}.webp`
)

const fallbackBanquetImages = Array.from({ length: 10 }, (_, index) =>
  `//${hostname}/uploads/banquet-${String(index + 1).padStart(4, '0')}.webp`
)

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
  const { documents } = useMenuDocuments()

  useScrollToMenu(ref);
  
  return (
    <SectionWrapper ref={ref}>
      <SectionTitle>Меню ресторана</SectionTitle>
      <SectionContent>
        <CardContainer>
          <MenuDocumentCard title="Меню" document={documents.menu} fallbackPreview={menuImg} fallbackImages={fallbackMenuImages} />
        </CardContainer>
        <Divider/>
        <CardContainer>
          <MenuDocumentCard title="Меню бара" document={documents.bar} fallbackPreview={barImg} fallbackImages={fallbackBarImages} />
        </CardContainer>
        <Divider/>
        <CardContainer>
          <MenuDocumentCard title="Банкетное меню" document={documents.banquet} fallbackPreview={banquetImg} fallbackImages={fallbackBanquetImages} />
        </CardContainer>
      </SectionContent>
    </SectionWrapper>
  )
}

const SectionContent = styled.div`
  display: grid;
  grid-gap: 32px;
  grid-auto-flow: column;
  grid-template-columns: repeat(3, minmax(400px, max-content));
  justify-content: center;
  margin: 16px 0;
  
  @media(max-width: ${BREAKPOINTS.dm}px) {
    display: block;
    margin: 0;
  }
`

const Divider = styled.div`
  display: none;
  height: 32px;
  width: 100%;

  @media(max-width: ${BREAKPOINTS.dm}px) {
    display: block;
  }
`

export default SectionPDFMenu
