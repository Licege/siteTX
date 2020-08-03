import React from 'react'
import { dishType } from '../../../types/types'
import SliderMenu from './SliderMenu'
import LinkButton from '../../common/elements/buttons/LinkButton'

interface IProps {
    menu: Array<dishType>

    addDishToBucket: ( dish: dishType ) => void
}

const SectionMenu: React.FC<IProps> = ( {menu, addDishToBucket} ) => (
    <div className='Section-menu'>
        <h2 className='Section-menu-header'>Наше меню</h2>
        <p className='Section-menu-info'>У нас каждый найдет себе блюдо по вкусу</p>
        <SliderMenu menu={menu} addDishToBucket={addDishToBucket}/>
        <LinkButton to='/menu' label={`Смотреть все меню из ${menu.length} блюд`}/>
    </div>
)

export default SectionMenu
