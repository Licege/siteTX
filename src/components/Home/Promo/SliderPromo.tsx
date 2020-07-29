import React from 'react'
import { promoType } from '../../../types/types'
import CustomSlider from '../../common/elements/sliders/CustomSlider'
import CardPromo from '../../common/elements/CardPromo'

interface IProps {
    promos: Array<promoType>
}

const SliderPromo: React.FC<IProps> = ( {promos} ) => {
    const settings = {
        dots: true,
        slidesToShow: 3,
        initialSlide: 1,
        centerMode: false,
        centerPadding: '30px',

        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    }


    return (
        <div className='Section-promo-slider'>
            <CustomSlider settings={settings}>
                {promos.map(( promo, key ) => (
                    <CardPromo promo={promo} key={key}/>
                ))}
            </CustomSlider>
        </div>
    )
}

export default SliderPromo
