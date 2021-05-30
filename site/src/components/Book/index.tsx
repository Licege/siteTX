import React, { useEffect, useRef, useState } from 'react'
import { Document, pdfjs } from 'react-pdf'
import HTMLFlipBook from 'react-pageflip'
import styled from 'styled-components'
import Pages from './Pages'
import { Loader } from '../core'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface IProps {
  file: any
}

interface INumPages {
  numPages?: number | null
}

function getPageWidth() {
  const pageWidth = document.body.getBoundingClientRect().width - 70

  return pageWidth < 595 ? pageWidth : 595
}

const Book: React.FC<IProps> = ({ file }) => {
  const bookRef = useRef<any>(null)
  const [numPages, setNumPages] = useState<number|null>(null)
  const width = getPageWidth()

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
    <Container>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess} loading={<Loader />}>
        { /* @ts-ignore */ }
        <FlipBook width={595}
                  height={841}
                  size='stretch'
                  minWidth={300}
                  minHeight={360}
                  maxHeight={841}
                  maxShadowOpacity={0.5}
                  // showCover
                  swipeDistance={30}
                  mobileScrollSupport={true}
                  autoSize
                  ref={bookRef}
        >
          <Pages counts={numPages} width={width} />
        </FlipBook>
      </Document>
    </Container>
  )
}

const Container = styled.div`
  width: 1190px;
  
  @media(max-width: 1280px) {
    width: 595px;
  }
  
  @media(max-width: 668px) {
    width: 500px;
  }
  
  @media(max-width: 565px) {
    width: 400px;
  }
  
  @media(max-width: 468px) {
    width: 360px;
  }
  
  @media(max-width: 375px) {
    width: 300px;
  }
`

const FlipBook = styled(HTMLFlipBook)`
  overflow: hidden;
`

export default Book