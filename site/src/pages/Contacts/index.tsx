import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import AddressBlock from './AddressBlock'
import { AboutUs } from './AboutUs'
import { PageContainer } from '../../components/core'

const Contacts = () => {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <Container>
      <Helmet title='О нас' />
      <AboutUs />
      <AddressBlock />
    </Container>
  )
}

const Container = styled(PageContainer)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export default Contacts
