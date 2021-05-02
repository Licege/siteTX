import React from 'react'
import { NavLink } from 'react-router-dom'
import { useCategoriesFeedLogic } from './logic'

const CategoriesFeed = (): JSX.Element => {
  const { categories, isPhone } = useCategoriesFeedLogic()

  return (
    <ul className={'menu-feed' + (isPhone ? '' : ' -fixed')}>
      {categories.map(category => (
        <li key={category.id}>
          <NavLink activeClassName="-active"
                   className="menu-feed-item"
                   to={`/menu/${category.titleEn}`}
          >
            {category.title}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

export default CategoriesFeed