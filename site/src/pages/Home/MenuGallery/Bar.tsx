import React, { useState } from 'react'
import styled from 'styled-components';
import Gallery from './Gallery';
import { Button } from '../../../components/core';

const { hostname } = window.location
const images = [
  `//${hostname}/uploads/0014.webp`,
  `//${hostname}/uploads/0015.webp`,
  `//${hostname}/uploads/0016.webp`,
  `//${hostname}/uploads/0017.webp`,
  `//${hostname}/uploads/0018.webp`,
  `//${hostname}/uploads/0019.webp`,
  `//${hostname}/uploads/0020.webp`,
  `//${hostname}/uploads/0021.webp`,
  `//${hostname}/uploads/0022.webp`,
  `//${hostname}/uploads/0023.webp`,
  `//${hostname}/uploads/0024.webp`,
  `//${hostname}/uploads/0025.webp`,
  `//${hostname}/uploads/0026.webp`,
  `//${hostname}/uploads/0027.webp`,
  `//${hostname}/uploads/0028.webp`,
  `//${hostname}/uploads/0029.webp`,
  `//${hostname}/uploads/0030.webp`,
  `//${hostname}/uploads/0031.webp`,
];

const BarGallery = () => {
  const [showBound, setShowBound] = useState(true)

  return (
    <Wrapper>
      {showBound && <Bound>
        <Button variant="contained" color="secondary" onClick={() => setShowBound(false)}>
          Мне есть 18 лет
        </Button>
        </Bound>}
      <Gallery images={images} />
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
  background-color: #989898e0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default BarGallery