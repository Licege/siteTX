import React from 'react'
import LinkButton from '../../../components/common/elements/buttons/LinkButton'
import SliderPromo from '../../../components/Sliders/SliderPromo'
import { SectionSubtitle, SectionTitle, SectionWrapper } from '../../../components/core'

const SectionPromo = () => (
    <SectionWrapper>
      <SectionTitle>Наши акции</SectionTitle>
      <SectionSubtitle>Выгодное предложение для Вас</SectionSubtitle>
      <SliderPromo />
      <LinkButton to='/actions' label='Смотреть все акции'/>
    </SectionWrapper>
)

export default SectionPromo
