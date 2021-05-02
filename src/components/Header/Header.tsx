import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Bucket from './Bucket'
import MobileMenu from '../common/elements/MobileMenu'
import AuthButton from '../AuthButton/AuthButton'
import { getCategoriesSelector } from '../../redux/selectors/menu'
import { requestCategories } from '../../redux/thunks/menu.thunk'
import { getMobileMenuStatusSelector } from '../../redux/selectors/app'
import { toggleMobileMenu } from '../../redux/reducers/app.reducer'
import Logo from './Logo'
import Navigation from './Navigation'


const Header: React.FC = () => {
    let categories = useSelector(getCategoriesSelector)
    let isOpenMobileMenu = useSelector(getMobileMenuStatusSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!categories.length) {
            dispatch(requestCategories())
        }
    }, [dispatch, categories])

    const toggle = () => {
        dispatch(toggleMobileMenu())
        isOpenMobileMenu
            ? document.body.classList.remove('scroll_block')
            : document.body.classList.add('scroll_block')
    }

    return (
        <header className={'header' + (isOpenMobileMenu ? ' -active' : '')}>
            <div className={isOpenMobileMenu ? 'burger -active' : 'burger'} onClick={toggle}><span/></div>
            <MobileMenu isOpen={isOpenMobileMenu} categories={categories} toggle={toggle}/>
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
