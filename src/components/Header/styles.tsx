import styled, { css } from 'styled-components'
import { HEADER_HEIGHT } from '../../styledComponents/constants'
import { BREAKPOINTS } from '../../styledComponents/helpers'
import { NavLink } from 'react-router-dom'

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
  right: 30px;
  display: flex;
`

export const AuthButtonWrapper = styled.div`
  height: 60px;
  margin-right: 1rem;
  display: flex;
  align-items: center;
`

export const Navbar = styled.nav`
  display: flex;
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
    width: 100%;
    margin-bottom: 0;
  }
  
  @media(max-width: ${BREAKPOINTS['tm']}) {
    display: none;
  }
`

export const NavItem = styled(NavLink)`
  &.active {
    color: gold;
  }
`