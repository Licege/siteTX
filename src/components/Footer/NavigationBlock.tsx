import React from 'react'
import { NavLink } from 'react-router-dom'

const NavigationBlock = () => (
  <nav className="footer__nav_block">
    <NavLink activeClassName="-active" className="footer__navbar-item" to="/actions">Акции</NavLink>
    {/*<NavLink activeClassName="-active" className="footer__navbar-item" to="/banquets">Банкеты</NavLink>*/}
    {/*<NavLink activeClassName="-active" className="footer__navbar-item" to="/vacancies">Вакансии</NavLink>*/}
    <NavLink activeClassName="-active" className="footer__navbar-item" to="/news">Новости</NavLink>
    {/*<NavLink activeClassName="-active" className="footer__navbar-item" to="/gallery">Фотогалерея</NavLink>*/}
    <NavLink activeClassName="-active" className="footer__navbar-item" to="/complain">Ваше мнение</NavLink>
    {/*<NavLink activeClassName='-active' className='footer__navbar-item' to='/reviews'>Отзывы</NavLink>*/}
  </nav>
)

export default NavigationBlock