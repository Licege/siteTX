import React from 'react'
import {NavLink} from 'react-router-dom'
import logo from '../../static/img/logo-header.png'
import LogoutBtn from '../common/element/LogoutBtn'

const Header = () => (
  <header className="header">
    <NavLink to="/"><img className="header-logo" src={logo} alt="Три Холма" /></NavLink>
    <div className="header-logout">
      <LogoutBtn />
    </div>
  </header>
)

export default Header
