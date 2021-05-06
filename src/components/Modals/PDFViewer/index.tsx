import React, { useState, useRef } from 'react'
import { Document, pdfjs } from 'react-pdf'
import { Dialog } from '@material-ui/core'
import Pages from '../../Book/Pages'
import styled from 'styled-components'
import Book from '../../Book'


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface INumPages {
  numPages: number | null
}

interface IProps {
  src: string
}

const PDFViewer: React.FC<IProps> = ({ src }) => {
  const [numPages, setNumPages] = useState<number|null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const refForScroll = useRef(null)

  const onDocumentLoadSuccess = ({ numPages }: INumPages) => setNumPages(numPages)

  return (
    <Dialog open ref={refForScroll} maxWidth='xl'>
      <Book file={src} />
    </Dialog>
  )
}

const Container = styled.div`
  position: relative;
`

// const Book = styled(Document)`
//   display: flex;
// `

const Counter = styled.div`
  color: #dc3545;
  position: fixed;
  top: 200px
`

export default PDFViewer