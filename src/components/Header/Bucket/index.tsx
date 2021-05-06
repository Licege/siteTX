import React, { useRef } from 'react'
import useButtonBucketLogic from './logic'
import shopping_cart from '../../../static/img/shopping-cart.png'
import BucketInfo from './BucketInfo'
import Counter from './Counter'
import useOutsideClick from '../../../hooks/outsideClick'

const Bucket = () => {
  const { moreInfo, toggle, close } = useButtonBucketLogic()
  // const ref = useRef(null)
  // useOutsideClick(ref, close)

  return (
      <div className='shopping_cart'>
          <div className='shopping_cart-bucket' onClick={toggle}>
              <img src={shopping_cart} alt='Корзина'/>
              <Counter />
          </div>
          <BucketInfo isOpen={moreInfo} toggle={toggle}/>
      </div>
  )
}

export default Bucket
