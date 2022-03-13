import React from 'react'
import PromosCards from './Cards'
import Header from './Header'

const Promos = () => (
  <div>
    <Header />
    <div className='promos'>
      <div className='promos-wrapper'>
        <PromosCards />
      </div>
    </div>
  </div>
)

export default Promos
