import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import logo from '../../static/img/logo.png'

const Logo = () => (
  <Link to="/">
    <LogoIcon src={logo} alt='logo' />
  </Link>
)

const LogoIcon = styled.img`
  margin-left: 20px;
  width: 96px;
  height: 64px;
`

export default Logo