import React from 'react'
import styled from 'styled-components'
import Sidebar from './sidebar'
import CategoriesFeed from './categoriesFeed'
import Cards from './cards/Cards'
import { PageTitle } from '../../components/core';

const Menu = () => (
  <Container>
    <Sidebar />
    <Wrapper>
      <CategoriesFeed />
      <PageTitle>~ Меню ~</PageTitle>
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

export default Menu
