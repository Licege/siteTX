import React, { useEffect } from 'react'
import ConnectWithUs from './ConnectWithUs'
import AddressBlock from './AddressBlock'
import { AboutUs } from './AboutUs'
import { PageContainer } from '../../components/core'
import styled from 'styled-components'


const Contacts: React.FC = () => {
    useEffect(() => {
        document.title = 'О нас'
        window.scroll(0, 0)
    }, [])

    return (
        <PageContainer>
            <AboutUs/>
            <BlocksWrapper>
                <AddressBlock />
                <ConnectWithUs />
            </BlocksWrapper>
        </PageContainer>
    )
}

const BlocksWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 36px;
`

export default Contacts
