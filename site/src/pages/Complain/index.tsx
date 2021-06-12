import React from 'react'
import ComplainForm from './ComplainForm'
import styled from 'styled-components'

const Complain = () => {
    return (
        <Container>
            <ComplainForm />
        </Container>
    )
}

const Container = styled.main`
    padding: 24px;
`

export default Complain