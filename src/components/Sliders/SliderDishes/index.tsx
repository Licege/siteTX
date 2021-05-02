import React from 'react'
import { useSliderDishesLogic } from './logic'
import CardDish from '../../common/elements/CardDish'
import CustomSlider from '../../common/elements/sliders/CustomSlider'
import config from './config'

const SliderDishes = () => {
  const { dishes, categories, addDishToBucket } = useSliderDishesLogic()

    return (
        <div className='Section-menu-slider'>
            <CustomSlider settings={config(dishes.length)}>
                {dishes.map(dish => (
                    <CardDish dish={dish} categories={categories} key={dish.id} addToBucket={addDishToBucket} showDescription={false}/>
                ))}
            </CustomSlider>
        </div>
    )
}

export default SliderDishes
