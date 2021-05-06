import React from 'react'
import { usePdfMenuLogic } from '../Menu/logic'
import Book from '../../../components/Book'

const SectionPDFMenu = () => {
  const { pdfMenuSrc, showPDFMenu } = usePdfMenuLogic()

  return (
    <section>
      <button onClick={showPDFMenu}>Показать меню</button>
    </section>
  )
}

export default SectionPDFMenu