import React from 'react'
import styled, { ThemedStyledProps } from 'styled-components'
import { Card as MaterialCard } from '@material-ui/core'
import Color from 'color'

interface ICard extends ThemedStyledProps<any, any> {
    minWidth?: number
    width?: number
    height?: number
    color?: any
}

interface IProps {
    children: any
}

const SCCard = styled(MaterialCard)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: ${(props: ICard) => `${props.minWidth ? `${props.minWidth}px` : '256px'}`};
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
    }
  }
`

const Card: React.FC<IProps> = ({ children }) => (
  <SCCard as='main'>{children}</SCCard>
)

export default Card