import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { Variant } from '@material-ui/core/styles/createTypography'

interface ICardTitle {
  variant?: Variant
}

const SCCardTitle = styled(Typography)`
  text-align: center;
  padding: 10px;
  color: saddlebrown;
`

export const CardTitle: React.FC<ICardTitle> = ({ variant = 'h5', children } = {}) => (
  <SCCardTitle variant={variant}>{children}</SCCardTitle>
)

export const CardText = styled(Typography)`
  overflow: hidden;
  padding: 0 8px;
`