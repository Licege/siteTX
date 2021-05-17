import styled, { css } from 'styled-components'
import { BREAKPOINTS } from '../../styledComponents/helpers'

interface IBurger {
  isOpen: boolean
}

export const BurgerMenu = styled.div`
  display: block;
  margin: auto 0 auto 20px;
  position: relative;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: inherit;
  cursor: pointer;
  z-index: 10;

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -1px; // - половина высоты
    margin-left: -10px; // - половина ширины
    height: 2px;
    width: 20px;
    background-color: ${props => props.theme.colors.brown.brand};

    &:before, &:after {
      display: block;
      position: absolute;
      content: '';
      width: 20px;
      height: 2px;
      background-color: ${props => props.theme.colors.brown.brand};
      transition: 0.2s;
    }

    &:before {
      transform: translateY(-5px);
    }

    &:after {
      transform: translateY(5px);
    }

    &:hover {
      transition: .4s;
      background-color: rgba(0, 0, 0, 0.04);
    }
  }
  
  @media(max-width: ${BREAKPOINTS['ds']}) {
    display: none;
  }
  
  @media(max-width: ${BREAKPOINTS['ts']}) {
    margin: auto 0;
  }
    
  ${(props: IBurger) => props.isOpen ? css`
    background-color: white;

    span {
      height: 0;

      &:before {
        transform: rotate(45deg);
      }

      &:after {
        transform: rotate(-45deg);
      }
    }

    &:hover {
      background-color: white;
    }
  ` : ''}
`

interface IWrapper {
  isOpen: boolean
}

export const Wrapper = styled.div`
  position: fixed;
  top: 60px;
  height: calc(100vh - 60px);
  width: 0;
  background-color: #f5f5f7;
  // background-color: #808080;
  overflow-x: hidden;
  overflow-y: auto;
  transition: width .3s ease-out;
  
  ${(props: IWrapper) => props.isOpen 
          ? css`
            width: 100%;
          `
          : ''
  }
`

export const NavigationBlock = styled.nav`
  border-top: 2px outset;

  ul {
    display: block;
    padding: 0;

    li {
      padding: 20px;
      font-size: 18px;

      &:nth-last-child(1) {
        margin-bottom: 30px;
      }

      a {
        display: block;
        width: 100%;

        &:hover {
          color: gold;
          transition: 0.3s;
        }
      }
    }
  }
`

export const CloseIcon = styled.img`
  width: 0;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  
  @media(max-width: ${BREAKPOINTS['ds']}) {
    display: block;
  }
`

export const Border = styled.span`
  display: block;
  margin-left: -40px;
  border: 2px outset;
`