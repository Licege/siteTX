import React from 'react'
import CategoriesFeed from './CategoriesFeed'
import CardDish from '../../components/common/elements/CardDish'
import { useMenuCardsLogic } from './logic'
import { categoryType } from '../../types/types'

type PropsTypes = {
  categories: categoryType[]
}

const MenuCards = ({ categories }: PropsTypes): JSX.Element => {
  const { dishes, order, isPhone, addDishToBucket, increaseCountDish, reduceCountDish } = useMenuCardsLogic()

  if (!dishes.length) {
    return <div className='menu-empty'>К сожалению, здесь пока ничего нет :(</div>
  }

  return (
    <div className='menu-wrapper'>
      <CategoriesFeed categories={categories} mobileMenuStatus={isPhone} />
      <h1 className='menu-wrapper-header'>~ Меню ~</h1>
      <div className='menu-wrapper-content'>
        {dishes.map(dish => <CardDish dish={dish}
                                      categories={categories}
                                      order={order}
                                      addToBucket={addDishToBucket}
                                      increaseCountDish={increaseCountDish}
                                      reduceCountDish={reduceCountDish}
                                      key={dish.id} />
        )}
      </div>
    </div>
  )
}

export default MenuCards