import styled from 'styled-components'
import { BREAKPOINTS } from '../../../styledComponents/helpers'

export const Container = styled.main`
  position: relative;
  padding: 16px 24px 72px;
  margin-top: 16px;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
`

export const Image = styled.img`
  display: block;
  width: 100%;
  max-width: 960px;
  max-height: 480px;
  height: auto;
  object-fit: contain;
  border-radius: 5px;
  margin: 0 auto 24px;
`

export const Wrapper = styled.div`
  padding: 0;
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
  margin-top: 24px;
  text-align: center;

  @media(min-width: ${BREAKPOINTS.ts + 1}px) {
    position: absolute;
    bottom: 16px;
    right: 0;
    margin-top: 0;
    text-align: right;
  }
`