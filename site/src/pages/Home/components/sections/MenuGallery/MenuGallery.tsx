import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Loader, SectionTitle, SectionWrapper } from '@/components/core'
import { useQuery } from '@/hooks/useQuery';
import { BREAKPOINTS } from '@/styledComponents/helpers'
import CardContainer from './CardContainer'
import MenuDocumentCard from './MenuDocumentCard'
import { useMenuDocuments } from './useMenuDocuments'

const MENU_ITEMS = [
  { type: 'menu' as const, title: 'Меню' },
  { type: 'bar' as const, title: 'Меню бара' },
  { type: 'banquet' as const, title: 'Банкетное меню' },
] as const

const hasDocumentFiles = (
  documents: ReturnType<typeof useMenuDocuments>['documents'],
  type: typeof MENU_ITEMS[number]['type']
) => (documents[type]?.files?.length ?? 0) > 0

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
  const { documents, loading } = useMenuDocuments()

  useScrollToMenu(ref);

  const filledItems = MENU_ITEMS.filter(({ type }) => hasDocumentFiles(documents, type))

  if (loading) {
    return (
      <SectionWrapper ref={ref}>
        <SectionTitle>Меню ресторана</SectionTitle>
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      </SectionWrapper>
    )
  }

  if (!filledItems.length) {
    return null
  }

  return (
    <SectionWrapper ref={ref}>
      <SectionTitle>Меню ресторана</SectionTitle>
      <SectionContent $columns={filledItems.length}>
        {filledItems.map(({ type, title }, index) => (
          <React.Fragment key={type}>
            {index > 0 && <Divider />}
            <CardContainer>
              <MenuDocumentCard title={title} document={documents[type]!} />
            </CardContainer>
          </React.Fragment>
        ))}
      </SectionContent>
    </SectionWrapper>
  )
}

const SectionContent = styled.div<{ $columns: number }>`
  display: grid;
  grid-gap: 32px;
  grid-auto-flow: column;
  grid-template-columns: repeat(${({ $columns }) => $columns}, minmax(400px, max-content));
  justify-content: center;
  margin: 16px 0;
  
  @media(max-width: ${BREAKPOINTS.dm}px) {
    display: block;
    margin: 0;
  }
`

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 320px;
  margin: 16px 0;
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
