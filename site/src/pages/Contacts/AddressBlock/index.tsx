import React from 'react'
import styled from 'styled-components';
import CustomMap from '../../../components/common/Map/Map'
import { useAddressBlockMapSize } from './logic'

const AddressBlock = () => {
  const size = useAddressBlockMapSize()

  return (
    <section>
      <SectionTitle>Мы на карте</SectionTitle>
      <CustomMap style={size} />
    </section>
  )
}

const SectionTitle = styled.h3`
  font-size: 1.4em;
  text-align: center;
`

export default AddressBlock
