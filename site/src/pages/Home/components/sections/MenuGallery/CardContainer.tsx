import React from 'react'
import styled from 'styled-components'

interface IProps {
}

const CardContainer: React.FC<IProps> = ({ children }) => (
  <Container>
    {children}
  </Container>
)

const Container = styled.div`
`

export default CardContainer