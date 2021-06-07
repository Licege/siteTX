import React from 'react'
import { CircularProgress } from '@material-ui/core'
import styled from 'styled-components';

const Loader = () => (
    <Container>
        <CircularProgress />
    </Container>
)

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

export default Loader
