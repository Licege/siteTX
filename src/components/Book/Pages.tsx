import React from 'react'
import { Page } from 'react-pdf'

interface IProps {
  counts: number|null
}

const Pages = React.forwardRef(({ counts }: IProps, ref: any): JSX.Element => {
  if (!counts) return <div />

  const arrayPages = Array.from(Array(counts))

  return (
    <>
      {arrayPages.map((_, i) => (
        <div ref={ref} key={`pdf-page-${i + 1}`}>
          <Page pageNumber={i + 1} />
        </div>
      ) )}
    </>
  )
})

// const Pages = ({ counts }: IProps): JSX.Element => {
//   const arrayPages = Array.from(Array(counts))
//
//   return (
//     <>
//       {arrayPages.map((_, i) => <Page key={`pdf-page-${i + 1}`} pageNumber={i + 1} /> )}
//     </>
//   )
// }

export default Pages