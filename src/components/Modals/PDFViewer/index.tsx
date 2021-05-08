import React, { useRef } from 'react'
import { Dialog } from '@material-ui/core'
import styled from 'styled-components'
import Book from '../../Book'
import { useModalActions } from '../../../redux/hooks/app.hooks'

interface IProps {
  src: string
}

const PDFViewer: React.FC<IProps> = ({ src }) => {
  const refForScroll = useRef(null)
  const { hideModal } = useModalActions()

  return (
    <Dialog open ref={refForScroll} onBackdropClick={hideModal} maxWidth='xl'>
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