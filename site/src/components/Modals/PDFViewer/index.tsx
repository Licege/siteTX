import React, { useRef } from 'react'
import { Dialog } from '@material-ui/core'
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

export default PDFViewer