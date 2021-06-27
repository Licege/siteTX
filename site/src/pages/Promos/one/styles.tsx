import styled from 'styled-components'
import { BREAKPOINTS } from '../../../styledComponents/helpers'
import altImg from '../../../static/img/dish.svg'

export const Container = styled.main`
    display: block;
    position: relative;
    padding: 16px 24px 8px;
    margin-top: 16px;

    @media(max-width: ${BREAKPOINTS.tm}px) {
        display: grid;
        grid-template-columns: 360px 1fr;
    }

    @media(max-width: ${BREAKPOINTS.ts}px) {
        grid-template-columns: auto;
    }
`

interface IImage {
  image: string
}

export const Image = styled.div`
    float: left;
    width: 540px;
    height: 360px;
    border-radius: 5px;
    background-image: ${(props: IImage) => `url(${props.image || altImg})`};
    background-size: cover;
    background-position: center;
    margin: 0 16px 8px 36px;

    @media(max-width: ${BREAKPOINTS.dm}px) {
        width: 480px;
    }

    @media(max-width: ${BREAKPOINTS.tm}px) {
        width: 360px;
        margin: 0;
    }

    @media(max-width: ${BREAKPOINTS.ts}px) {
        width: 100%;
        height: initial;
        max-height: 360px;
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