import React from 'react'
import LinkButton from '../../../components/common/elements/buttons/LinkButton'
import SliderPromo from '../../../components/Sliders/SliderPromo'

const SectionPromo = () => (
    <div className='Section-promo'>
        <h2 className='Section-promo-header'>Наши акции</h2>
        <div className='Section-promo-info'>Выгодное предложение для Вас</div>
        <SliderPromo />
        <LinkButton to='/actions' label='Смотреть все акции'/>
    </div>
)

export default SectionPromo
