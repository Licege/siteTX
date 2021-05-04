import React from 'react'
import styled from 'styled-components'
import { CardMedia as MaterialCardMedia } from '@material-ui/core'

interface IProps {
  image: string
  onClick?: () => void
}

const SCCardMedia = styled(MaterialCardMedia)`
  border-radius: 16px 16px 0 0;
  background-size: cover;
  min-height: 200px;
`

const CardMedia: React.FC<IProps> = ({ image, onClick }) => (
  <picture>
    <SCCardMedia image={image} onClick={onClick} />
  </picture>
)

export default CardMedia