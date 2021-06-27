import styled from 'styled-components'
import { Typography } from '@material-ui/core'

export const CardTitle = styled(Typography).attrs(props => ({
  variant: props.variant || 'h5'
}))`
  text-align: center;
  padding: 10px;
  color: saddlebrown;
`

export const CardText = styled(Typography)`
  overflow: hidden;
  padding: 0 8px;
`