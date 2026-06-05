import React, { useState } from 'react'
import styled from 'styled-components';
import Gallery from './Gallery';
import { Button } from '@/components/core';
import menuImg from '@/static/img/bar.jpg'

const { hostname } = window.location
const images = [
  `//${hostname}/uploads/bar-0001.webp`,
  `//${hostname}/uploads/bar-0002.webp`,
  `//${hostname}/uploads/bar-0003.webp`,
  `//${hostname}/uploads/bar-0004.webp`,
  `//${hostname}/uploads/bar-0005.webp`,
  `//${hostname}/uploads/bar-0006.webp`,
  `//${hostname}/uploads/bar-0007.webp`,
  `//${hostname}/uploads/bar-0008.webp`,
  `//${hostname}/uploads/bar-0009.webp`
];

const BarGallery = () => {
  const [showBound, setShowBound] = useState(false)

  return (
    <Wrapper>
      {showBound && <Bound>
        <Button variant="contained" color="secondary" onClick={() => setShowBound(false)}>
          Мне есть 18 лет
        </Button>
        </Bound>}
      <Gallery backgroundImage={menuImg} images={images} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
`

const Bound = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  //background-color: #989898e0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default BarGallery