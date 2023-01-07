import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { SectionWrapper } from '@/components/core'
import { BREAKPOINTS } from '@/styledComponents/helpers'

export const Wrapper = styled(SectionWrapper)`
  margin: 0;
  
  @media(max-width: ${BREAKPOINTS.ts}px) {
    flex-direction: column;
  }
`

export const OrderBlock = styled.div`
  text-align: center;
`

export const Phone = styled.a`
  font-weight: 700;
  color: ${props => props.theme.colors.blue.brand};
  text-decoration: underline;
  white-space: nowrap;
  margin-right: 8px;
`

export const MenuLink = styled(Link)`
  font-weight: 600;
  text-decoration: none;
`

export const Body = styled.div`
  display: flex;
  justify-content: center;
`

export const Image = styled.div`
  margin: 20px;
  background-image: url("../../../static/img/packet-delivery.jpg");
  border-radius: 5px;
  width: 320px;
  height: 320px;

  @media(max-width: ${BREAKPOINTS.ts}px) {
    width: 264px;
    height: 264px;
    margin: 12px auto;
  }
`

export const DignityBlock = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  margin-top: 20px;
`

export const DignityItem = styled.div`
  text-align: center;
  margin: auto;
`