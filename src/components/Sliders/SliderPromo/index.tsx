import React from 'react'
import CustomSlider from '../../common/elements/sliders/CustomSlider'
import CardPromo from '../../Cards/CardPromo'
import { usePromos } from '../../../redux/hooks/promos.hooks'
import config from './config'

const SliderPromo = () => {
    const promos = usePromos()

    return (
        <div className='Section-promo-slider'>
            <CustomSlider settings={config(promos.length)}>
                {promos.map((promo, key) => (
                    <CardPromo promo={promo} key={key}/>
                ))}
            </CustomSlider>
        </div>
    )
}

export default SliderPromo
