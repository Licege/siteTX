import React from 'react'
import { useSliderDishesLogic } from './logic'
import CardDish from '../../Cards/CardDish'
import CustomSlider from '../../common/elements/sliders/CustomSlider'
import config from './config'
import styled from 'styled-components'

const SliderDishes = () => {
  const {dishes} = useSliderDishesLogic()

  return (
    <Container>
      <CustomSlider settings={config(dishes.length)}>
        {dishes.map(dish => <CardDish dish={dish} key={dish.id} showDescription={false} />)}
      </CustomSlider>
    </Container>
  )
}

const Container = styled.div`
  //max-width: 680px;
  max-width: calc(100vw - 90px);
  margin: 0 auto;

  button {
    &:before, &:after {
      color: ${props => props.theme.colors.gray.brand};
    }
  }
`

export default SliderDishes
