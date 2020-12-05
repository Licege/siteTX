import React from 'react'
import { categoryType, dishType } from '../../../types/types'
import CardDish from '../../common/elements/CardDish'
import CustomSlider from '../../common/elements/sliders/CustomSlider'

interface IProps {
    menu: Array<dishType>
    categories: Array<categoryType>

    addDishToBucket: (dish: dishType) => void
}

const SliderMenu: React.FC<IProps> = ({ menu, categories, addDishToBucket }) => {
    const getCountSlidesToShow = (count: number) => {
        return count > menu.length ? menu.length : count
    }

    const settings = {
        dots: false,
        slidesToShow: getCountSlidesToShow(5),
        initialSlide: 1,
        centerMode: false,
        centerPadding: '30px',

        responsive: [
            {
                breakpoint: 1150,
                settings: {
                    slidesToShow: getCountSlidesToShow(4),
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: getCountSlidesToShow(3),
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: getCountSlidesToShow(2),
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: getCountSlidesToShow(1),
                    slidesToScroll: 1,
                },
            },
        ],
    }


    return (
        <div className='Section-menu-slider'>
            <CustomSlider settings={settings}>
                {menu.map(dish => (
                    <CardDish dish={dish} categories={categories} key={dish.id} addToBucket={addDishToBucket} showDescription={false}/>
                ))}
            </CustomSlider>
        </div>
    )
}

export default SliderMenu
