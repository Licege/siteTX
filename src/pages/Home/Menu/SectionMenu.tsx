import React from 'react'
import ShowAllButton from './ShowAllButton'
import SliderDishes from '../../../components/Sliders/SliderDishes'


const SectionMenu = () => (
    <div className='Section-menu'>
        <h2 className='Section-menu-header'>Наше меню</h2>
        <p className='Section-menu-info'>У нас каждый найдет себе блюдо по вкусу</p>
        <SliderDishes />
        <ShowAllButton />
    </div>
)

export default SectionMenu
