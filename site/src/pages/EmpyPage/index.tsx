import React from 'react'
import styled from 'styled-components'

const EmptyPage = () => (
  <Container>
    Здесь пока ничего нет, заходи позднее... Я уверен тут что-нибудь появится!
  </Container>
)

const Container = styled.main`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-content: center;
`

export default EmptyPage