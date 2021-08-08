import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet';
import ComplainForm from './ComplainForm'

const Complain = () => (
  <Container>
    <Helmet title='Ваше мнение' />
    <ComplainForm />
  </Container>
)

const Container = styled.main`
    padding: 24px;
`

export default Complain