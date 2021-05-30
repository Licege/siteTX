import React from 'react'
import AddressInfo from './AddressInfo'
import CustomMap from '../../../components/common/Map/Map'

const AddressBlock = () => (
  <div>
    <h3>Мы на карте</h3>
    <AddressInfo />
    <CustomMap/>
  </div>
)

export default AddressBlock
