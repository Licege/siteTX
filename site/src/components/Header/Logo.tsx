import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import logo from '../../static/img/logo-header.webp'

const Logo = () => (
  <Link to="/">
    <LogoIcon src={logo} alt="Три Холма" />
  </Link>
)

const LogoIcon = styled.img`
  margin-left: 20px;
  height: 64px;
  width: auto;
  display: block;
`

export default Logo