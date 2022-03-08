import React from 'react'
import { useWindowSize } from '../../../hooks/windowResize';
import { SectionWrapper } from '../../../components/core';
import Tour3D from '../../../components/Tour3D';


const Tour = () => {
  const { width } = useWindowSize()

  return (
    <SectionWrapper>
      <Tour3D width={width - 40} height={360} />
    </SectionWrapper>
  )
}

export default Tour