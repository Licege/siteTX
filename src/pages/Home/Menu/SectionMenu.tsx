import React from 'react'
import { categoryType, dishType } from '../../../types/types'
import SliderMenu from './SliderMenu'
import LinkButton from '../../../components/common/elements/buttons/LinkButton'

interface IProps {
    menu: Array<dishType>
    categories: Array<categoryType>

    addDishToBucket: ( dish: dishType ) => void
}

const SectionMenu: React.FC<IProps> = ({ menu, categories, addDishToBucket }) => (
    <div className='Section-menu'>
        <h2 className='Section-menu-header'>Наше меню</h2>
        <p className='Section-menu-info'>У нас каждый найдет себе блюдо по вкусу</p>
        <SliderMenu menu={menu} categories={categories} addDishToBucket={addDishToBucket}/>
        <LinkButton to='/menu' label={`Смотреть все меню из ${menu.length} блюд`}/>
    </div>
)

export default SectionMenu
