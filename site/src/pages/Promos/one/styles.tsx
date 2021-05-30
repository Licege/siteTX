import styled from 'styled-components'
import { BREAKPOINTS } from '../../../styledComponents/helpers'
import altImg from '../../../static/img/dish.svg'

export const Container = styled.main`
    display: grid;
    grid-template-columns: 540px 1fr;
    padding: 16px 24px 8px;
    margin-top: 16px;
    
    @media(max-width: ${BREAKPOINTS['dm']}px) {
        grid-template-columns: 480px 1fr;
    }

    @media(max-width: ${BREAKPOINTS['tm']}px) {
        grid-template-columns: 360px 1fr;
    }

    @media(max-width: ${BREAKPOINTS['ts']}px) {
        grid-template-columns: auto;
    }
`

interface IImage {
  image: string
}

export const Image = styled.div`
    width: 540px;
    height: 360px;
    border-radius: 5px;
    background-image: ${(props: IImage) => `url(${props.image || altImg})`};
    background-size: cover;
    background-position: center;

    @media(max-width: ${BREAKPOINTS['dm']}px) {
        width: 480px;
    }

    @media(max-width: ${BREAKPOINTS['tm']}px) {
        width: 360px;
    }

    @media(max-width: ${BREAKPOINTS['ts']}px) {
        width: 100%;
        height: auto;
        max-height: 360px;
    }
`

export const Wrapper = styled.div`
    position: relative;
    padding-right: 16px;
    padding-left: 36px;
`

export const Content = styled.div`
    margin-bottom: 50px;
`

export const Title = styled.h2`
    text-align: center;
    font-size: 1.4rem;
    font-weight: 700;
    
    @media(max-width: ${BREAKPOINTS['ts']}px) {
        margin-top: 8px;
    }
`

export const ActionsBlock = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
`