import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import ButtonBucket from '../Bucket/ButtonBucket'
import MobileMenu from '../common/elements/MobileMenu'
import AuthButton from '../Auth/AuthButton'
import { getCategoriesSelector } from '../../redux/selectors/menu'
import { getCategories } from '../../redux/thunks/menu.thunk'
import logo from '../../static/img/logo.png'
import { getMobileMenuStatusSelector } from '../../redux/selectors/app'
import { actions } from '../../redux/actions/app.actions'


const Header: React.FC = () => {
    let categories = useSelector(getCategoriesSelector)
    let isOpenMobileMenu = useSelector(getMobileMenuStatusSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!categories.length) {
            dispatch(getCategories())
        }
    }, [dispatch, categories])

    const toggle = () => {
        dispatch(actions.toggleMobileMenu())
        isOpenMobileMenu
            ? document.body.classList.remove('scroll_block')
            : document.body.classList.add('scroll_block')
    }

    return (
        <header className={'header' + (isOpenMobileMenu ? ' -active' : '')}>
            <div className={isOpenMobileMenu ? 'burger -active' : 'burger'} onClick={toggle}><span/></div>
            <MobileMenu isOpen={isOpenMobileMenu} categories={categories} toggle={toggle}/>
            <Link to="/"><img className='header-logo' src={logo} alt=''/></Link>
            <nav className='header-navbar'>
                <ul>
                    <li>
                        <NavLink exact activeClassName='-active' className='header-navbar-item' to='/'>ГЛАВНАЯ</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='-active' className='header-navbar-item' to='/menu'>МЕНЮ</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='-active' className='header-navbar-item' to='/news'>СОБЫТИЯ</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='-active' className='header-navbar-item' to='/order'>ЗАКАЗ
                            СТОЛОВ</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='-active' className='header-navbar-item' to='/contacts'>О НАС</NavLink>
                    </li>
                </ul>
            </nav>

            <div className='header-action'>
                <div className='header-action-button'>
                    <AuthButton/>
                </div>

                <ButtonBucket/>
            </div>
        </header>
    )
}

export default Header
