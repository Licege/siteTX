import styled from 'styled-components'
import { CardMedia as MaterialCardMedia } from '@material-ui/core'

interface IProps {
  image: string
  cursor?: 'pointer'|'default'
  onClick?: () => void
}

const CardMedia = styled(MaterialCardMedia).attrs((props: IProps) => ({
  image: props.image,
  onClick: props.onClick
}))`
  cursor: ${props => props.onClick ? 'pointer' : 'default'};
  border-radius: 16px 16px 0 0;
  background-size: cover;
  min-height: 200px;
`

export default CardMedia