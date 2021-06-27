import React from 'react'
import InfoBlock from './InfoBlock'
import AddressBlock from './AddressBlock'
import NavigationBlock from './NavigationBlock'
import Copyright from './Copyright'
import { FooterContainer, Wrapper } from './styles'

const Footer = () => (
  <FooterContainer id='footer'>
    <Wrapper>
      <InfoBlock />
      <AddressBlock />
      <NavigationBlock />
    </Wrapper>
    <Copyright />
  </FooterContainer>
)

export default Footer
