import React from 'react'
import {dishType} from "../../../types/types";
import CardDish from "../../common/elements/CardDish";
import CustomSlider from "../../common/elements/sliders/CustomSlider";

interface IProps {
    menu: Array<dishType>

    addDishToBucket: (dish: dishType) => void
}

const SliderMenu: React.FC<IProps> = ({menu, addDishToBucket}) => {
    const settings = {
        dots: false,
        slidesToShow: 3,
        initialSlide: 1,
        centerMode: false,
        centerPadding: '30px',

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }


    return (
        <div className='Section-menu-slider'>
            <CustomSlider settings={settings}>
                {menu.map(dish => (
                    <CardDish dish={dish} key={dish._id} addToBucket={addDishToBucket} showDescription={false} />
                ))}
            </CustomSlider>
        </div>
    )
}

export default SliderMenu;
