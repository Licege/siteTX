import React from 'react'
import Map from '@/components/common/Map/Map'
import { useWindowSize } from '@/hooks'

const SectionMap = () => {
  const { width } = useWindowSize()

  return (
    <section>
      <Map style={{ width, height: '424px' }}/>
    </section>
  )
}

export default SectionMap
