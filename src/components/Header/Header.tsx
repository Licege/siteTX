import React from 'react'
import Bucket from './Bucket'
import MobileMenu from '../common/elements/MobileMenu'
import AuthButton from '../AuthButton/AuthButton'
import Logo from './Logo'
import Navigation from './Navigation'
import { useHeaderLogic } from './logic'


const Header: React.FC = () => {
    const { isMenuOpen } = useHeaderLogic()

    return (
        <header className={'header' + (isMenuOpen ? ' -active' : '')}>
            <MobileMenu />
            <Logo />
            <Navigation />
            <div className='header-action'>
                <div className='header-action-button'>
                    <AuthButton/>
                </div>
                <Bucket/>
            </div>
        </header>
    )
}

export default Header
