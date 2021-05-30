import React from 'react'
import AddressInfo from './AddressInfo'
import PhoneInfo from './PhoneInfo'
import { AddressBlockContainer } from '../styles'

const AddressBlock = () => (
  <AddressBlockContainer>
    <AddressInfo />
    <PhoneInfo />
  </AddressBlockContainer>
)

export default AddressBlock