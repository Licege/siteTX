import styled from 'styled-components'

export const PageContainer = styled.main`
  max-width: 1150px;
  width: 100%;
  margin: 32px auto;
  padding: 24px;
  background-color: #fff;
  
  @media(max-width: 1200px) {
    max-width: 800px;
  }

  @media(max-width: 576px) {
    padding: 0 .25rem .25rem;
  }
`