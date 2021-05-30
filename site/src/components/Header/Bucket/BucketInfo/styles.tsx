import styled from 'styled-components'
import { BREAKPOINTS } from '../../../../styledComponents/helpers'
import { NavLink } from 'react-router-dom'

export const ContentWrapper = styled.div`
  margin-bottom: 20px;
  border-bottom: 2px dashed saddlebrown;
`

export const ListDishes = styled.div`
  margin-bottom: 20px;
  max-height: 360px;
  overflow-x: hidden;
  overflow-y: auto;
`

export const Dish = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
`

export const DishTitle = styled.div`
  width: 40%;
  overflow: hidden;
`

export const Count = styled.div`
  display: flex;
  width: 30%;
  height: 100%;
  max-width: 90px;
  
  input {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border-color: ${props => props.theme.colors.brown.brand};
    border-style: solid;
    text-align: center;
    outline: none;
  }
`

export const Price = styled.div`
  width: 20%;
  margin: auto;
  text-align: center;
`

export const FooterContainer = styled.div`
  display: flex;
  
  @media(max-width: ${BREAKPOINTS['ts']}px) {
    display: block;
  }
`

export const TotalPrice = styled.div`
  width: 50%;
  font-size: 1.2rem;
  
  @media(max-width: ${BREAKPOINTS['ts']}px) {
    width: auto;
    text-align: center;
    font-size: 1.4rem;
    margin-bottom: 8px;
  }
`

export const SubmitButton = styled(NavLink)`
  width: 50%;
  display: flex;
  justify-content: space-evenly;

  button {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }

  @media(max-width: ${BREAKPOINTS['ts']}px) {
    width: auto;
  }
`