import styled, { css } from 'styled-components'

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  color: ${props => props.theme.colors.brown.brand};
`

interface ISectionSubtitle {
  noMargin?: boolean
}

export const SectionSubtitle = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.gray.brand};
  text-align: center;
  margin-bottom: 16px;

  ${(props: ISectionSubtitle) => props.noMargin
    ? css`margin: 0;`
    : ''
}
`

interface ISectionWrapper {
  display?: 'flex'|'block'|'grid'
  noBorder?: boolean
}

export const SectionWrapper = styled.section`
  padding: 20px;
  border-bottom: 1px dashed ${props => props.theme.colors.brown.brand};
  display: ${(props: ISectionWrapper) => props.display ? props.display : 'block'};
  
  ${props => props.noBorder 
    ? css`border-bottom: inset;`
    : ''
}
`