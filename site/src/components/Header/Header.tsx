import React from 'react'
import { isProduction } from '@/utils'
import Bucket from './Bucket'
import MobileMenu from '../MobileMenu'
import AuthButton from '../AuthButton/AuthButton'
import Logo from './Logo'
import Navigation from './Navigation'
import { useHeaderLogic } from './logic'
import { ActionsBlock, AuthButtonWrapper, Container } from './styles'


const Header: React.FC = () => {
  const { isMenuOpen } = useHeaderLogic()

  return (
    <Container isMenuOpen={isMenuOpen}>
      <Logo />
      <Navigation />
      <ActionsBlock isMenuOpen={isMenuOpen}>
        {!isProduction() && <AuthButtonWrapper>
          <AuthButton/>
        </AuthButtonWrapper>}
        {!isProduction() && <Bucket/>}
        <MobileMenu />
      </ActionsBlock>
    </Container>
  )
}

export default Header
