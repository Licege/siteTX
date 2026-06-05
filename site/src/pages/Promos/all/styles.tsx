import styled from 'styled-components'
import { BREAKPOINTS } from '../../../styledComponents/helpers'

export const Container = styled.main`
  padding: 8px 24px 40px;
  margin-top: 16px;
`

export const Title = styled.h1`
  font-size: 1.5rem;
  line-height: 1.2;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
`

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: start;
  gap: 20px;
  width: 100%;
  max-width: 840px;
  margin: 0 auto;

  @media (max-width: ${BREAKPOINTS.tm}px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    max-width: 560px;
  }

  @media (max-width: ${BREAKPOINTS.ts}px) {
    grid-template-columns: 1fr;
    max-width: 320px;

    .card_promo--wide {
      grid-column: span 1;
    }
  }
`