import React from 'react'
import LinkButton from "../../common/elements/buttons/LinkButton";

interface IProps {

}

const SectionPromo: React.FC<IProps> = () => (
    <div className='Section-promo'>
        <div className='Section-promo-header'>Наши акции</div>
        <div className='Section-promo-info'>Выгодное предложение для Вас</div>
        <LinkButton to='/actions' label='Смотреть все акции' />
    </div>
)

export default SectionPromo;