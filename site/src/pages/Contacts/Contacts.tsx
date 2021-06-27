import React, { useEffect } from 'react'
import styled from 'styled-components'
import ConnectWithUs from './ConnectWithUs'
import AddressBlock from './AddressBlock'
import { AboutUs } from './AboutUs'
import { PageContainer } from '../../components/core'
import { BREAKPOINTS } from '../../styledComponents/helpers';

const Contacts: React.FC = () => {
  useEffect(() => {
    document.title = 'О нас'
    window.scroll(0, 0)
  }, [])

  return (
    <PageContainer>
      <AboutUs />
      <BlocksWrapper>
        <AddressBlock />
        <ConnectWithUs />
      </BlocksWrapper>
    </PageContainer>
  )
}

const BlocksWrapper = styled.div`
  display: flex;
  grid-template-columns: 1fr 1fr;
  grid-gap: 36px;
  
  @media(max-width: ${BREAKPOINTS.ts}px) {
    flex-direction: column-reverse;
  }
`

export default Contacts
