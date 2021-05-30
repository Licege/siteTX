import React, { useState } from 'react'
import CardPdf from '../../../components/Cards/CardPdf'
import menuImg from '../../../static/img/menu.jpg'
// @ts-ignore
import pdfMenuDrinks from '../../../temp/tri_holma_bar.pdf'
import styled from 'styled-components'
import { Button } from '../../../components/core'

const PDFBar = () => {
  const [showBound, setShowBound] = useState(true)

  return (
    <Wrapper>
      {showBound && <Bound>
        <Button variant="contained" color="secondary" onClick={() => setShowBound(false)}>
          Мне есть 18 лет
        </Button>
      </Bound>}
      <CardPdf imageSrc={menuImg} pdfSrc={pdfMenuDrinks} />
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

export default PDFBar