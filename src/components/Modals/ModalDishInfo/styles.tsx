import styled from 'styled-components'
import { Dialog } from '@material-ui/core'
import { BREAKPOINTS } from '../../../styledComponents/helpers'

export const Container = styled(Dialog)`
  .MuiDialogContent-root {
    padding: 0;

    &:first-child {
      padding: 0;
    }
  }

  .MuiDialog-paperWidthSm {
    max-width: none;
  }

  &::-webkit-scrollbar {
    width: 0;
  }
`

export const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  
  @media(max-width: ${BREAKPOINTS['ts']}) {
    flex-direction: column;
  }
`

export const Close = styled.div`
  width: 21px;
  height: 21px;
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
  //background: $brand-grey url("/src/static/img/close-small-white.png") center no-repeat;
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 20;
  transition: opacity .3s;

  &:hover {
    opacity: .4;
  }
`

export const Image = styled.img`
  width: 600px;
  height: 400px;
  
  @media(max-width: ${BREAKPOINTS['ts']}) {
    width: 216px;
    height: 216px;
  }
`

export const InfoBlock = styled.div`
  padding: 16px 0 0 30px;
  
  @media(max-width: ${BREAKPOINTS['ts']}) {
    padding: 0;
  }
`

export const Title = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.3;
  
  @media(max-width: ${BREAKPOINTS['ts']}) {
    margin-top: 8px;
    margin-bottom: 12px;
  }
`

export const Description = styled.div`
  margin: 16px 0;
`

export const Energy = styled.div`
  margin-bottom: 16px;

  @media(max-width: ${BREAKPOINTS['ts']}) {
    margin-bottom: 8px;
  }
`

export const EnergyTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
`

export const EnergyDescription = styled.div`
  table {
    width: 100%;
  }
`

export const Worth = styled.div`
  display: flex;
  justify-content: center;
`

export const Price = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
`

export const Weight = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: 8px;
  font-size: .75rem;
`

export const OrderButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`

export const NoDelivery = styled.div`
  margin-top: 8px;
  line-height: 18px;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`


