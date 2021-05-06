import React from 'react'
import { NavLink } from 'react-router-dom'
import { useMenuSidebarLogic } from './logic'

const Sidebar = (): JSX.Element => {
  const { categories, height } = useMenuSidebarLogic()

  return (
      <div className='menu-categories' id='menu-categories-navbar' style={{ height }}>
          <h2 className='menu-categories-title'>Категории</h2>
          <div className='menu-categories-content'>
              {categories.map((category) =>
                  <NavLink activeClassName='-active'
                           className='menu-categories-content-item'
                           to={`/menu/${category.titleEn}`}
                           key={category.id}
                  >
                    {category.title}
                  </NavLink>,
              )}
          </div>
      </div>
  )
}

export default Sidebar