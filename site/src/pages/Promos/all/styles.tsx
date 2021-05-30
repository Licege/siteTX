import styled from 'styled-components'

export const Container = styled.main`
  padding: 8px 24px 40px;
  margin-top: 16px;
`

export const Title = styled.h1`
  font-size: 1.5rem;
  line-height: 1.2;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
`

export const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(300px, 400px));
  grid-gap: 16px;
`