import React from 'react'
import SliderPromo from '../../../components/Sliders/SliderPromo'
import { SectionSubtitle, SectionTitle, SectionWrapper } from '../../../components/core'
import { LinkButton } from '../styles'

const SectionPromo = () => (
    <SectionWrapper>
      <SectionTitle>Наши акции</SectionTitle>
      <SectionSubtitle>Выгодное предложение для Вас</SectionSubtitle>
      <SliderPromo />
      <LinkButton to='/actions' label='Смотреть все акции'/>
    </SectionWrapper>
)

export default SectionPromo
