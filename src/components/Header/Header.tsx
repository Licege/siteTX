import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import Bucket from './Bucket'
import MobileMenu from '../common/elements/MobileMenu'
// import AuthButton from '../AuthButton/AuthButton'
// import { getCategoriesSelector } from '../../redux/selectors/menu'
// import { requestCategories } from '../../redux/thunks/menu.thunk'
// import { getMobileMenuStatusSelector } from '../../redux/selectors/app'
import { toggleMobileMenu } from '../../redux/reducers/app.reducer'
import Logo from './Logo'
import Navigation from './Navigation'
// import { useCategories } from '../../redux/hooks/menu.hooks'
import { getIsPhone } from '../../redux/getters/app.getters'
import { useContacts } from '../../redux/hooks/contacts.hooks'


const Header: React.FC = () => {
    // const categories = useCategories()
    const isOpenMobileMenu = useSelector(getIsPhone)
    const dispatch = useDispatch()
    const contacts = useContacts()

    const toggle = () => {
        dispatch(toggleMobileMenu())
        isOpenMobileMenu
            ? document.body.classList.remove('scroll_block')
            : document.body.classList.add('scroll_block')
    }

    return (
        <header className={'header' + (isOpenMobileMenu ? ' -active' : '')}>
            <div className={isOpenMobileMenu ? 'burger -active' : 'burger'} onClick={toggle}><span/></div>
            <MobileMenu isOpen={isOpenMobileMenu} phone={contacts.phone} toggle={toggle}/>
            <Logo />
            <Navigation phone={contacts.phone} />
            {/*<div className='header-action'>*/}
            {/*    <div className='header-action-button'>*/}
            {/*        <AuthButton/>*/}
            {/*    </div>*/}
            {/*    <Bucket/>*/}
            {/*</div>*/}
        </header>
    )
}

export default Header
