import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet';
import AddressBlock from './AddressBlock'
import { AboutUs } from './AboutUs'
import { PageContainer } from '../../components/core'

const Contacts: React.FC = () => {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <PageContainer>
      <Helmet title='О нас' />
      <AboutUs />
      <AddressBlock />
    </PageContainer>
  )
}

export default Contacts
