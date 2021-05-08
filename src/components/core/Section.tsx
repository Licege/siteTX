import styled from 'styled-components'

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  color: ${props => props.theme.colors.brown.brand};
`

interface ISectionWrapper {
  display?: 'flex'|'block'|'grid'
}

export const SectionWrapper = styled.section`
  padding: 20px;
  border-bottom: 1px dashed ${props => props.theme.colors.brown.brand};
  display: ${(props: ISectionWrapper) => props.display ? props.display : 'block'};
`