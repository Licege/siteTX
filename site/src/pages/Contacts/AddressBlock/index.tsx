import React from 'react'
import AddressInfo from './AddressInfo'
import CustomMap from '../../../components/common/Map/Map'
import { useAddressBlockMapSize } from './logic';

const AddressBlock = () => {
  const size = useAddressBlockMapSize()

  return (
    <div>
      <h3>Мы на карте</h3>
      <AddressInfo/>
      <CustomMap style={size} />
    </div>
  )
}

export default AddressBlock
