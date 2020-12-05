import React from 'react'
import { promoType } from '../../../types/types'
import CustomSlider from '../../common/elements/sliders/CustomSlider'
import CardPromo from '../../common/elements/CardPromo'

interface IProps {
    promos: Array<promoType>
}

const SliderPromo: React.FC<IProps> = ({ promos }) => {
    const getCountSlidesToShow = (count: number) => {
        return count > promos.length ? promos.length : count
    }

    const settings = {
        dots: true,
        slidesToShow: getCountSlidesToShow(3),
        initialSlide: 1,
        centerMode: false,
        centerPadding: '30px',

        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: getCountSlidesToShow(2),
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: getCountSlidesToShow(1),
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
