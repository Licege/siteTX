import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { useCategoriesFeedLogic } from './logic'

const CategoriesFeed = (): JSX.Element => {
  const { categories } = useCategoriesFeedLogic()

  return (
    <Feed>
      {categories.map(category => (
        <li key={category.id}>
          <FeedItem activeClassName="-active" to={`/menu/${category.titleEn}`}>
            {category.title}
          </FeedItem>
        </li>
      ))}
    </Feed>
  )
}

const Feed = styled.ul`
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 1;
  list-style: none;
  overflow-x: auto;
  height: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  border-top: 1px solid darkgrey;
  background-color: #fff;
  position: fixed;
  top: 58px;
  left: 0;
  right: 0;
  
  &::-webkit-scrollbar {
    height: 0;
  }
  
  @media (max-width: 992px) {
    display: flex;
  }
`

const FeedItem = styled(NavLink)`
  margin-right: 16px;
  margin-bottom: 8px;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  color: ${props => props.theme.colors.brown.brand};
  text-decoration: none;

  &.-active {
    color: ${props => props.theme.colors.activeLink};
    border-bottom: 2px solid;
  }

  &:hover {
    color: ${props => props.theme.colors.hover};
    text-decoration: none;
  }
`

export default CategoriesFeed