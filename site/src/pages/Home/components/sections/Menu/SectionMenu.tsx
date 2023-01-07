import React from 'react'
import SliderDishes from '@/components/Sliders/SliderDishes'
import { SectionSubtitle, SectionTitle, SectionWrapper } from '@/components/core'
import ShowAllButton from './ShowAllButton'


const SectionMenu = () => (
  <SectionWrapper>
    <SectionTitle>Наше меню</SectionTitle>
    <SectionSubtitle>У нас каждый найдет себе блюдо по вкусу</SectionSubtitle>
    <SliderDishes />
    <ShowAllButton />
  </SectionWrapper>
)

export default SectionMenu
