import React from 'react'
import styled from 'styled-components'
import ComplainForm from './ComplainForm'

const Complain = () => (
  <Container>
    <ComplainForm />
  </Container>
)

const Container = styled.main`
    padding: 24px;
`

export default Complain