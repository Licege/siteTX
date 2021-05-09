import React from 'react'
import Sidebar from './sidebar'
import CategoriesFeed from './categoriesFeed'
import Cards from './cards/Cards'
import styled from 'styled-components'

const Menu = () => (
  <Container>
    <Sidebar />
    <Wrapper>
      <CategoriesFeed />
      <Title>~ Меню ~</Title>
      <Cards />
    </Wrapper>
  </Container>
)

const Container = styled.main`
  display: flex;
  position: relative;
  padding: 0 0 16px;
  margin-top: 16px;
  overflow: hidden;
`

const Wrapper = styled.div`
  padding-left: 250px;
  padding-top: 8px;
  width: 100%;
  
  @media(max-width: 992px) {
    padding-left: 0;
    padding-top: 60px;
  }
`

const Title = styled.h1`
  font-size: 1.6em;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
`

export default Menu
