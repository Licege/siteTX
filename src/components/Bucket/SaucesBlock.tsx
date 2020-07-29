import React from 'react'
import CustomSlider from '../common/elements/sliders/CustomSlider'
import {dishType} from '../../types/types'
import CardDish from '../common/elements/CardDish'

interface IProps {
    sauces: Array<dishType>

    addDishToBucket: (dish: dishType) => void
}

export const SaucesBlock: React.FC<IProps> = ({sauces, addDishToBucket}) => {
    const settings = {
        dots: false,
        slidesToShow: 3,
        initialSlide: 1,
        centerMode: false,
        centerPadding: '30px',
        autoplay: false,
        arrows: true,

        responsive: [
            {
                breakpoint: 1150,
                settings: {
                    slidesToShow: 2,
                    initialSlide: 2,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    initialSlide: 2,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    }

    return (
        <div className='mt-5'>
            <h3 className='mb-3 pl-3'>Выберите соус</h3>
            <CustomSlider settings={settings}>
                {sauces.map(sauce => (
                    <CardDish dish={sauce} addToBucket={addDishToBucket} shortCard={true} key={sauce._id}/>
                ))}
            </CustomSlider>
        </div>
    )
}
