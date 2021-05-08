import React from 'react'
import { Page } from 'react-pdf'
import styled from 'styled-components'

interface IProps {
  counts: number|null
  width: number
}

const Pages = React.forwardRef(({ counts, width }: IProps, ref: any): JSX.Element => {
  if (!counts) return <div />

  const arrayPages = Array.from(Array(counts))

  return (
    <>
      {arrayPages.map((_, i) => (
        <PageWrapper ref={ref} key={`pdf-page-${i + 1}`}>
          <Page pageNumber={i + 1} width={width} />
        </PageWrapper>
      ) )}
    </>
  )
})

const PageWrapper = styled.div`
  //width: 100%;
  //max-width: 595px;
`

export default Pages