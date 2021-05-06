import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../static/img/logo.png'

const Logo = () => (
  <Link to="/">
    <img className='header-logo' src={logo} alt=''/>
  </Link>
)

export default Logo