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
    padding: 0 16px .25rem;
  }
`

export const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 0;
`