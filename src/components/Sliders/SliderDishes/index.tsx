import React from 'react'
import { useSliderDishesLogic } from './logic'
import CardDish from '../../Cards/CardDish'
import CustomSlider from '../../common/elements/sliders/CustomSlider'
import config from './config'

const SliderDishes = () => {
  const { dishes } = useSliderDishesLogic()

    return (
        <div className='Section-menu-slider'>
            <CustomSlider settings={config(dishes.length)}>
                {dishes.map(dish => <CardDish dish={dish} key={dish.id} showDescription={false} /> )}
            </CustomSlider>
        </div>
    )
}

export default SliderDishes
