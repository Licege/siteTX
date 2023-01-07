import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'
import { HEADER_HEIGHT } from '@/styledComponents/constants'
import { BREAKPOINTS } from '@/styledComponents/helpers'

interface IHeader {
  isMenuOpen?: boolean
}

export const Container = styled.header`
  position: fixed;
  display: inline-flex;
  align-items: center;
  background-color: white;
  // background: linear-gradient(to top, rgba(0, 0, 0, .0001), rgb(8, 8, 8));
  height: ${HEADER_HEIGHT};
  width: 100%;
  z-index: 2;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  
  ${(props: IHeader) => props.isMenuOpen ? css`background-color: #f5f5f7;` : ''}
`

export const ActionsBlock = styled.div`
  position: fixed;
  right: ${(props: IHeader) => props.isMenuOpen ? 'calc(12px + 8px)' : '12px'};;
  display: flex;
`

export const AuthButtonWrapper = styled.div`
  height: 60px;
  margin-right: 1rem;
  display: flex;
  align-items: center;
`

export const Navbar = styled.nav`
  display: inline-block;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  font-family: Forum, serif;
  font-size: 22px;
  line-height: 44px;
  padding: 0 240px 0 10px;
  color: black;
  // color: #FFFFFF;
  user-select: none;

  ul {
    height: 100%;
    width: 100%;
    margin-bottom: 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    list-style: none;
    white-space: nowrap;
  }

  li {
    text-transform: uppercase;
    cursor: auto;
  }

  a {
    text-decoration: none;
    color: black;
  }

  ul, li {
    list-style: none;
  }
  
  &:hover, &:visited {
    text-decoration: none;
  }
  
  
  @media(max-width: ${BREAKPOINTS.ds}px) {
    display: none;
  }
`

export const NavItem = styled(NavLink)`
  &.active {
    color: #008000;
  }
`