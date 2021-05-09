import React from 'react'
import { NavLink } from 'react-router-dom'
import { useMenuSidebarLogic } from './logic'
import styled from 'styled-components'

const Sidebar = (): JSX.Element => {
  const {categories, height} = useMenuSidebarLogic()

  return (
    <Container id="menu-categories-navbar" height={height}>
      <Title>Категории</Title>
      <Body>
        {categories.map(category =>
          <Category activeClassName="-active" to={`/menu/${category.titleEn}`} key={category.id}>
            {category.title}
          </Category>
        )}
      </Body>
    </Container>
  )
}

interface IContainer {
  height: number
}

const Container = styled.aside.attrs((props: IContainer) => {})`
  position: fixed;
  padding-top: 8px;
  border-right-style: inset;
  height: ${(props: IContainer) => `${props.height}px`};
  width: 250px;

  @media (max-width: 992px) {
    display: none;
  }
`

const Title = styled.h2`
  width: 180px;
  font-size: 1.4em;
  text-align: center;
  margin: 0 auto 16px;
  border-bottom: dotted;
`

const Body = styled.div`
  height: calc(100vh - 113px - 37px);
  overflow: hidden;

  &:hover {
    overflow: auto;
    overflow-x: hidden !important;
  }
`

const Category = styled(NavLink)`
  display: block;
  padding: 16px;
  font-size: 18px;
  color: ${props => props.theme.colors.brown.brand};

  &.-active {
    color: gold;
  }

  &:hover {
    color: coral;
    background-color: antiquewhite;
    transform: scale(1.02);
    transition: 0.3s;
  }
`

export default Sidebar