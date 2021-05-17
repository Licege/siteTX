import React from 'react'
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
            <MobileMenu />
            <Logo />
            <Navigation />
            <ActionsBlock>
                <AuthButtonWrapper>
                    <AuthButton/>
                </AuthButtonWrapper>
                <Bucket/>
            </ActionsBlock>
        </Container>
    )
}

export default Header
