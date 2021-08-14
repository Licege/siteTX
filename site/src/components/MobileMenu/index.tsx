import React from 'react'
import { NavLink } from 'react-router-dom'
import closeImg from '../../static/img/close.png'
import { useMobileMenuLogic } from '../Header/logic'
import { Border, BurgerMenu, CloseIcon, NavigationBlock, Wrapper } from './styles'
import { isProduction } from '../../utils';
import CallToAs from '../CallToAs';

const MobileMenu = () => {
  const { isMenuOpen, categories, toggleMenu } = useMobileMenuLogic()

  return (
    <>
      <BurgerMenu isOpen={isMenuOpen} onClick={toggleMenu}><span/></BurgerMenu>
      <Wrapper isOpen={isMenuOpen}>
        <NavigationBlock>
          <CloseIcon src={closeImg} onClick={toggleMenu} alt='Закрыть' />
          <ul>
            {!isProduction() &&
              <li>
                <NavLink activeClassName="-active" to="/menu" onClick={toggleMenu}>Все меню</NavLink>
              </li>
            }
            {!isProduction() && categories.map(category => (
              <li key={category.id}>
                <NavLink activeClassName='-active'
                         onClick={toggleMenu}
                         to={`/menu/${category.titleEn}`}
                         key={category.id}>
                  {category.title}
                </NavLink>
              </li>
            ))}
            {!isProduction() && <Border/>}
            <li>
              <NavLink activeClassName='-active' to='/news' onClick={toggleMenu}>СОБЫТИЯ</NavLink>
            </li>
            {!isProduction()
              ? (
                <li>
                  <NavLink activeClassName="-active" to="/order" onClick={toggleMenu}>ЗАКАЗ СТОЛОВ</NavLink>
                </li>)
              : (
                <li>
                  <CallToAs text='ЗАКАЗ СТОЛОВ' />
                </li>
              )
            }
            <li>
              <NavLink activeClassName='-active' to='/contacts' onClick={toggleMenu}>О НАС</NavLink>
            </li>
            {!isProduction() &&
              <li>
                <NavLink activeClassName="-active" to="/gallery" onClick={toggleMenu}>ФОТОГАЛЕРЕЯ</NavLink>
              </li>}
          </ul>
        </NavigationBlock>
      </Wrapper>
    </>
  )
}

export default MobileMenu
