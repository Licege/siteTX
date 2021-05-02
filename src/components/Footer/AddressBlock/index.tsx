import React from 'react'
import AddressInfo from './AddressInfo'
import PhoneInfo from './PhoneInfo'

const AddressBlock = () => (
  <div className='footer__address_block'>
    <AddressInfo />
    <PhoneInfo />
  </div>
)

export default AddressBlock