import styled from 'styled-components'
import { HEADER_HEIGHT, FOOTER_HEIGHT } from './styledComponents/constants'

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;
`

export const AppContent = styled.div`
  display: grid;
  grid-template-rows: 1fr ${FOOTER_HEIGHT};
  overflow-x: hidden;
  min-height: calc(100vh - ${HEADER_HEIGHT});
  margin-top: ${HEADER_HEIGHT};
  background-color: rgb(251, 251, 253);
`