import styled from 'styled-components'
import { CardActions } from '@material-ui/core'

const SCFooter = styled(CardActions).attrs(() => ({
  as: 'footer'
}))`
  margin: 16px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

export default SCFooter