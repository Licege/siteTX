import React from 'react'
import { NavLink } from 'react-router-dom'
import { categoryType } from '../../types/types'

type CategoriesFeedType = {
  categories: Array<categoryType>
  mobileMenuStatus: boolean
}

const CategoriesFeed = ({ categories, mobileMenuStatus }: CategoriesFeedType): JSX.Element => (
  <ul className={'menu-feed' + (mobileMenuStatus ? '' : ' -fixed')}>
    {categories.map(category => (
      <li key={category.id}>
        <NavLink activeClassName='-active'
                 className='menu-feed-item'
                 to={`/menu/${category.titleEn}`}
        >
          {category.title}
        </NavLink>
      </li>
    ))}
  </ul>
)

export default CategoriesFeed