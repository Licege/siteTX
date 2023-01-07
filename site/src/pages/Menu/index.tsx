import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet';
import { PageTitle } from '@/components/core';
import Sidebar from './sidebar'
import CategoriesFeed from './categoriesFeed'
import Cards from './cards/Cards'

const Menu = () => (
  <Container>
    <Helmet title='Меню' />
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
  margin: 16px 0;
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
