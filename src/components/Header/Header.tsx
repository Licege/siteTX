import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import ButtonBucket from '../Bucket/ButtonBucket'
import MobileMenu from '../common/elements/MobileMenu'
import AuthButton from '../Auth/AuthButton'
import { getCategoriesSelector } from '../../redux/selectors/menu'
import { getCategories } from '../../redux/menu-reducer'
import logo from '../../static/img/logo.png'


const Header: React.FC = () => {
    let categories = useSelector(getCategoriesSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!categories.length) {
            dispatch(getCategories())
        }
    }, [dispatch, categories])

    const [active, setActive] = useState(false)

    const toggle = () => {
        setActive(!active)
        active ? document.body.classList.remove('scroll_block') : document.body.classList.add('scroll_block')
    }

    return (
        <header className={'header' + (active ? ' -active' : '')}>
            <div className={active ? 'burger -active' : 'burger'} onClick={toggle}><span/></div>
            <MobileMenu isOpen={active} categories={categories} toggle={toggle}/>
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
