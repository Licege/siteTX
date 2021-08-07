import styled from 'styled-components'
import { BREAKPOINTS } from '../../../styledComponents/helpers'

export const Container = styled.main`
  display: block;
  position: relative;
  padding: 16px 24px 8px;
  margin-top: 16px;

  &:after {
    content: " ";
    display: table;
    clear: both;
  }
`

export const Image = styled.img`
    float: left;
    border-radius: 5px;
    margin: 0 16px 8px 36px;

    @media(max-width: ${BREAKPOINTS.ts}px) {
      margin: 0 0 16px;
      width: 100%;
    }
`

export const Wrapper = styled.div`
    padding-right: 16px;
    padding-left: 36px;

  @media(max-width: ${BREAKPOINTS.ts}px) {
    padding: 0;
  }
`

export const Content = styled.div`
    margin-bottom: 50px;
`

export const Title = styled.h2`
    text-align: center;
    font-size: 1.4rem;
    font-weight: 700;
    
    @media(max-width: ${BREAKPOINTS.ts}px) {
        margin-top: 8px;
    }
`

export const ActionsBlock = styled.div`
    position: absolute;
    bottom: 16px;
    right: 40px;
`