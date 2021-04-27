import React from 'react'
import Sidebar from './sidebar'
import MenuCards from './MenuCards'
import { useAllCategories } from '../../redux/hooks'

const Menu: React.FC = () => {
  const categories = useAllCategories()

  return (
      <div className='menu'>
          <Sidebar categories={categories} />
          <MenuCards categories={categories} />
      </div>
  )
}

export default Menu
