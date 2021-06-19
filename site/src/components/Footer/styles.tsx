import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { FOOTER_HEIGHT } from '../../styledComponents/constants'
import { BREAKPOINTS } from '../../styledComponents/helpers'
import CallToAs from '../CallToAs';

export const FooterContainer = styled.footer`
  width: 100%;
  flex: 0 0 auto;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  // background-color: khaki;
  background-color: #f5f5f7;
  padding: 20px;
  position: relative;
  min-height: ${FOOTER_HEIGHT};
  display: table;
  // background: center / cover no-repeat url("../../static/img/background3.svg");
  
  @media(max-width: ${BREAKPOINTS['tm']}px) {
    padding: 1rem .5rem;
  }
`

export const Wrapper = styled.div`
  display: grid;
  grid-template-areas: 'info address nav';
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 16px;
  grid-column-gap: 16px;
  justify-items: center;
  margin-bottom: 16px;

  a {
    text-decoration: none;
  }

  &:hover, &:visited {
    color: inherit;
    text-decoration: none;
  }
  
  @media(max-width: ${BREAKPOINTS['ts']}px) {
    grid-template-areas: 'info nav' 'address address';
    grid-template-columns: 1fr 1fr;
    justify-items: flex-start;
    font-size: 12px;
    line-height: 16px;
  }
`

export const NavBlock = styled.nav`
  grid-area: nav;
  margin: auto;
  font-size: ${props => props.theme.font.size.normal};
  
  a {
    display: block;
    color: #999;

    &:hover {
      color: #000;
    }
  }
`

export const NavItem = styled(NavLink)`
  display: block;
  color: #999;

  &.active {
    color: #000;
  }

  &:hover {
    color: #000;
  }
`

const BlockContainer = styled.div`
  @media(max-width: ${BREAKPOINTS['tm']}px) {
    font-size: 16px;
    line-height: 18px;
  }
`

export const InfoBlockContainer = styled(BlockContainer)`
  grid-area: info;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const AddressBlockContainer = styled(BlockContainer)`
  grid-area: address;
`

export const Address = styled.address`
  margin-bottom: 8px;

  a {
    color: #999;

    &:hover {
      color: #000;
    }
  }
`

export const Phone = styled.a`
  text-decoration: none;
  white-space: nowrap;
  color: #999;

  &:hover {
    color: inherit;
    text-decoration: none;
  }
`

export const SocialNav = styled.nav`
  padding-top: 8px;

  a {
    margin-right: 8px;
  }
`

export const Schedule = styled.div``

export const Title = styled.span`
  text-transform: uppercase;
  font-weight: 600;
  display: block;
  margin-bottom: 12px;
  
  img {
    padding-bottom: 4px;
  }
`

export const CopyrightInfo = styled.small`
  display: block;
  font-size: 12px;
  text-align: center;
`