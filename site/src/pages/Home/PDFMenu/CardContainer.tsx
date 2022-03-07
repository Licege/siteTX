import React from 'react'
import styled from 'styled-components'

interface IProps {
  title: string
}

const CardContainer: React.FC<IProps> = ({ title, children }) => (
  <Container>
    <Title>{title}</Title>
    {children}
  </Container>
)

const Container = styled.div`
`

const Title = styled.h3`
  color: ${props => props.theme.colors.brown.brand};
  text-align: center;
`

export default CardContainer