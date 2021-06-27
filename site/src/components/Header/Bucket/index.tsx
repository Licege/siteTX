import React from 'react'
import styled from 'styled-components'
import useButtonBucketLogic from './logic'
import shopping_cart from '../../../static/img/shopping-cart.png'
import BucketInfo from './BucketInfo'
import Counter from './Counter'

const Bucket = () => {
  const { moreInfo, toggle } = useButtonBucketLogic()

  return (
    <Container>
      <BucketIcon onClick={toggle}>
        <img src={shopping_cart} alt="Корзина" />
        <Counter />
      </BucketIcon>
      <BucketInfo isOpen={moreInfo} toggle={toggle} />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`

const BucketIcon = styled.div`
  cursor: pointer;
  
  img {
    width: 50px;
    height: 50px;
  }

  &:hover {
    span {
      background-color: red;
    }
  }
`

export default Bucket
