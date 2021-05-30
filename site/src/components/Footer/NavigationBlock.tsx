import React from 'react'
import { NavBlock, NavItem } from './styles'

const NavigationBlock = () => (
  <NavBlock>
    <NavItem activeClassName="active" to="/actions">Акции</NavItem>
    <NavItem activeClassName="active" to="/banquets">Банкеты</NavItem>
    <NavItem activeClassName="active" to="/vacancies">Вакансии</NavItem>
    <NavItem activeClassName="active" to="/news">Новости</NavItem>
    <NavItem activeClassName="active" to="/gallery">Фотогалерея</NavItem>
    <NavItem activeClassName="active" to="/complain">Ваше мнение</NavItem>
    {/*<NavLink activeClassName='-active' className='footer__navbar-item' to='/reviews'>Отзывы</NavLink>*/}
  </NavBlock>
)

export default NavigationBlock