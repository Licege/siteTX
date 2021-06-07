import React, { useEffect, useRef, useState } from 'react'
import { Document, pdfjs } from 'react-pdf'
import styled from 'styled-components'
import Pages from './Pages'
import { Loader } from '../core'
import { useWindowSize } from '../../hooks/windowResize';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface IProps {
  file: any
}

interface INumPages {
  numPages?: number | null
}

const calculateWidth = (width: number) => {
  if (width > 1024) return 960
  if (width > 768) return width - 100
  if (width > 600) return width - 90
  if (width > 412) return width - 80
  return width - 70
}

const Book: React.FC<IProps> = ({ file }) => {
  const bookRef = useRef<any>(null)
  const [numPages, setNumPages] = useState<number|null>(null)
  const { width: pageWidth } = useWindowSize()
  const width = calculateWidth(pageWidth);

  useEffect(() => {
    window.addEventListener('keydown', onKeyHandle)

    return () => window.removeEventListener('keydown', onKeyHandle)
  }, [])

  const onKeyHandle = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        prevPage()
        break
      case 'ArrowRight':
        nextPage()
        break
      default:
        break;
    }
  }

  const nextPage = () => bookRef.current.pageFlip().flipNext()

  const prevPage = () => bookRef.current.pageFlip().flipPrev()

  const onDocumentLoadSuccess = ({ numPages }: INumPages) => setNumPages(numPages!)

  return (
    <Container style={{ width: width }}>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess} loading={<Loader />} >
          <Pages counts={numPages} width={width} />
      </Document>
    </Container>
  )
}

const Container = styled.div``

export default Book