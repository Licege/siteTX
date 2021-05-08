import React from 'react'
import Sidebar from './sidebar'
import CategoriesFeed from './categoriesFeed'
import Cards from './cards/Cards'

const Menu: React.FC = () => (
      <div className='menu'>
          <Sidebar />
          <div className='menu-wrapper'>
            <CategoriesFeed />
            <h1 className='menu-wrapper-header'>~ Меню ~</h1>
            <Cards />
          </div>
      </div>
  )

export default Menu
