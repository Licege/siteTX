import React from 'react'
import { categoryType } from '../../../types/types'
import { NavLink } from 'react-router-dom'
import closeImg from '../../../static/img/close.png'

interface IProps {
    isOpen: boolean,
    categories: Array<categoryType>

    toggle: () => void
}

const MobileMenu = ( {isOpen, categories, toggle}: IProps ) => {
    return (
        <div className={'mobile_menu' + (isOpen ? ' -active' : '')}>
            <nav className='mobile_menu-wrapper'>
                <img src={closeImg} className='mobile_menu-wrapper-close' onClick={toggle} alt='Закрыть'/>
                <ul>
                    <li>
                        <NavLink activeClassName='-active' to='/menu' onClick={toggle}>Все меню</NavLink>
                    </li>
                    {categories.map(category => (
                        <li key={category._id}>
                            <NavLink activeClassName='-active'
                                     onClick={toggle}
                                     to={`/menu/${category.title_en}`}
                                     key={category._id}>
                                {category.title}
                            </NavLink>
                        </li>
                    ))}
                    <span className='mobile_menu-wrapper-border'/>
                    <li>
                        <NavLink activeClassName='-active' to='/news' onClick={toggle}>СОБЫТИЯ</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='-active' to='/order' onClick={toggle}>ЗАКАЗ СТОЛОВ</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='-active' to='/contacts' onClick={toggle}>О НАС</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='-active' to='/gallery' onClick={toggle}>ФОТОГАЛЕРЕЯ</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default MobileMenu
