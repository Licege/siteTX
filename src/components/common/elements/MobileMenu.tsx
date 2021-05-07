import React from 'react'
import { categoryType } from '../../../types/types'
import { NavLink } from 'react-router-dom'
import closeImg from '../../../static/img/close.png'
import { useMobileMenuLogic } from '../../Header/logic'

const MobileMenu = () => {
    const { isMenuOpen, categories, toggleMenu } = useMobileMenuLogic()

    return (
      <>
          <div className={isMenuOpen ? 'burger -active' : 'burger'} onClick={toggleMenu}><span/></div>
          <div className={'mobile_menu' + (isMenuOpen ? ' -active' : '')}>
              <nav className='mobile_menu-wrapper'>
                  <img src={closeImg} className='mobile_menu-wrapper-close' onClick={toggleMenu} alt='Закрыть'/>
                  <ul>
                      <li>
                          <NavLink activeClassName='-active' to='/menu' onClick={toggleMenu}>Все меню</NavLink>
                      </li>
                      {categories.map(category => (
                        <li key={category.id}>
                            <NavLink activeClassName='-active'
                                     onClick={toggleMenu}
                                     to={`/menu/${category.titleEn}`}
                                     key={category.id}>
                                {category.title}
                            </NavLink>
                        </li>
                      ))}
                      <span className='mobile_menu-wrapper-border'/>
                      <li>
                          <NavLink activeClassName='-active' to='/news' onClick={toggleMenu}>СОБЫТИЯ</NavLink>
                      </li>
                      <li>
                          <NavLink activeClassName='-active' to='/order' onClick={toggleMenu}>ЗАКАЗ СТОЛОВ</NavLink>
                      </li>
                      <li>
                          <NavLink activeClassName='-active' to='/contacts' onClick={toggleMenu}>О НАС</NavLink>
                      </li>
                      <li>
                          <NavLink activeClassName='-active' to='/gallery' onClick={toggleMenu}>ФОТОГАЛЕРЕЯ</NavLink>
                      </li>
                  </ul>
              </nav>
          </div>
      </>

    )
}

export default MobileMenu
