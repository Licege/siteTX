import React from 'react'
import CustomSlider from '../../common/elements/sliders/CustomSlider'
import CardDish from '../../Cards/CardDish'
import config from './config'
import useSauceSliderLogic from './logic'


export const SaucesBlock = () => {
  const { sauces } = useSauceSliderLogic()
  const settings = config(sauces.length)

  if (!sauces.length) return null

  return (
    <div className='mt-5'>
      <h3 className='mb-3 pl-3'>Выберите соус</h3>
      <CustomSlider settings={settings}>
        {sauces.map(sauce => <CardDish dish={sauce} shortCard key={sauce.id}/>)}
      </CustomSlider>
    </div>
  )
}
