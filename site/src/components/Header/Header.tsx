import React from 'react'
import Bucket from './Bucket'
import MobileMenu from '../MobileMenu'
import AuthButton from '../AuthButton/AuthButton'
import Logo from './Logo'
import Navigation from './Navigation'
import { useHeaderLogic } from './logic'
import { ActionsBlock, AuthButtonWrapper, Container } from './styles'
import { isProduction } from '../../utils'


const Header: React.FC = () => {
  const { isMenuOpen } = useHeaderLogic()

  return (
    <Container isMenuOpen={isMenuOpen}>
      <MobileMenu />
      <Logo />
      <Navigation />
      {!isProduction() && <ActionsBlock>
        <AuthButtonWrapper>
          <AuthButton/>
        </AuthButtonWrapper>
        <Bucket/>
        </ActionsBlock>}
    </Container>
  )
}

export default Header
