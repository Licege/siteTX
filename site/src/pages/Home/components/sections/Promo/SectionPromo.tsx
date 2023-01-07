import React from 'react'
import { useSectionPromosLogic } from './logic'
import SliderPromo from '@/components/Sliders/SliderPromo'
import { SectionSubtitle, SectionTitle, SectionWrapper } from '@/components/core'
import { LinkButton } from '../../buttons'

const SectionPromo = () => {
  const { isPromosExist } = useSectionPromosLogic()

  if (!isPromosExist) return null;

  return (
    <SectionWrapper>
      <SectionTitle>Наши акции</SectionTitle>
      <SectionSubtitle>Выгодное предложение для Вас</SectionSubtitle>
      <SliderPromo />
      <LinkButton to='/actions' label='Смотреть все акции'/>
    </SectionWrapper>
  )
}

export default SectionPromo
