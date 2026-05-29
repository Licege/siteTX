import React from 'react'
import styled from 'styled-components'
import { BREAKPOINTS } from '@/styledComponents/helpers';

interface IProps {
  imageSrc: string
  onClick: () => void
}

const ImageWithBackground: React.FC<IProps> = ({ imageSrc, onClick }) => (
  <Image imageSrc={imageSrc} onClick={onClick} />
)

interface IImage {
  imageSrc: string
}

const Image = styled.div`
  background-image: ${(props: IImage) => `url(${props.imageSrc})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 4px;
  height: 500px;
  width: 100%;
  cursor: pointer;
  transition: all .4s;
  
  &:hover {
    transform: scale(1.02);
    filter: brightness(50%);
  }

  @media(max-width: ${BREAKPOINTS.dm}px) {
    background-size: contain;
  }
`

export default ImageWithBackground