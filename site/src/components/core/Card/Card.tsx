import styled, { ThemedStyledProps } from 'styled-components'
import { Card as MaterialCard } from '@material-ui/core'
import Color from 'color'

interface ICard extends ThemedStyledProps<any, any> {
    minWidth?: number
    width?: number
    height?: number
    color?: any
}

const Card = styled(MaterialCard).attrs(() => ({
  as: 'main'
}))`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: ${(props: ICard) => `${props.minWidth ? `${props.minWidth}px` : '256px'}`};
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 16px !important;
  box-shadow: none;
  width: ${(props: ICard) => `${props.width ? `${props.width}px` : '280px' }`};
  height: ${(props: ICard) => `${props.height ? `${props.height}px` : '480px' }`};
  position: relative;
  &:hover {
        box-shadow: ${(props: ICard) => `0 6px 12px 0 ${Color(props.color || '#ff9900')
    .rotate(-12)
    .darken(0.2)
    .fade(0.5)}`
};
      background-color: rgb(250, 235, 225);
      transition: 0.2s;
  }
`

export default Card