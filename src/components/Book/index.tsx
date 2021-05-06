import React, { useEffect, useRef, useState } from 'react'
import { Document } from 'react-pdf'
import HTMLFlipBook from 'react-pageflip'
import styled from 'styled-components'
import Pages from './Pages'

interface IProps {
  file: any
}

interface INumPages {
  numPages: number | null
}

const Book: React.FC<IProps> = ({ file }) => {
  const bookRef = useRef<any>(null)
  const [numPages, setNumPages] = useState<number|null>(null)

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

  const onDocumentLoadSuccess = ({ numPages }: INumPages) => setNumPages(numPages)

  return (
    <Container>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        { /* @ts-ignore */ }
        <FlipBook width={595}
                  height={841}
                  size='stretch'
                  minWidth={300}
                  minHeight={841}
                  maxHeight={841}
                  maxShadowOpacity={0.5}
                  // showCover
                  mobileScrollSupport={true}
                  autoSize
                  ref={bookRef}
        >
          <Pages counts={numPages} />
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
`

const FlipBook = styled(HTMLFlipBook)`
  overflow: hidden;
`

export default Book