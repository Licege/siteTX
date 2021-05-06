import React, { useEffect, useState } from 'react'
import { Page } from 'react-pdf'

const usePDFViewerLogic = () => {
  const pdfFile = useState(null)
  const [numPages, setNumPages] = useState<number>(1)
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {

  }, [])
}