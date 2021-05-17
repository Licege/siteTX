import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../static/img/logo.png'
import styled from 'styled-components'

const Logo = () => (
  <Link to="/">
    <LogoIcon src={logo} alt='' />
  </Link>
)

const LogoIcon = styled.img`
  margin-left: 20px;
  width: 96px;
  height: 64px;
`

export default Logo