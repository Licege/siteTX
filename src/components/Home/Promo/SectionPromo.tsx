import React from 'react'
import LinkButton from '../../common/elements/buttons/LinkButton'
import { promoType } from '../../../types/types'
import SliderPromo from './SliderPromo'

interface IProps {
    promos: Array<promoType>
}

const SectionPromo: React.FC<IProps> = ( {promos} ) => (
    <div className='Section-promo'>
        <div className='Section-promo-header'>Наши акции</div>
        <div className='Section-promo-info'>Выгодное предложение для Вас</div>
        <SliderPromo promos={promos}/>
        <LinkButton to='/actions' label='Смотреть все акции'/>
    </div>
)

export default SectionPromo
