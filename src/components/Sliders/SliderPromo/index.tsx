import React from 'react'
import CustomSlider from '../../common/elements/sliders/CustomSlider'
import CardPromo from '../../Cards/CardPromo'
import { usePromos } from '../../../redux/hooks/promos.hooks'
import config from './config'
import styled from 'styled-components'

const SliderPromo = () => {
    const promos = usePromos()

    return (
        <Wrapper>
            <CustomSlider settings={config(promos.length)}>
                {promos.map((promo, key) => (
                    <CardPromo promo={promo} key={key}/>
                ))}
            </CustomSlider>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  max-width: calc(100vw - 90px);
  margin: 0 auto 32px;

  button {
    &:before, &:after {
      color: ${props => props.theme.colors.gray.brand};
    }
  }
`

export default SliderPromo
