import React from 'react'
import { useCardPDFLogic } from './logic'
import ImageWithBackground from '../../core/ImageWithBackground'

interface IProps {
  imageSrc: string
  pdfSrc: string
}

const CardPdf: React.FC<IProps> = ({ imageSrc, pdfSrc }) => {
  const { showPDF } = useCardPDFLogic(pdfSrc)

  return <ImageWithBackground imageSrc={imageSrc} onClick={showPDF} />
}

export default CardPdf