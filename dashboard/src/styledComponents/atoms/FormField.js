import styled from 'styled-components'
import { Field as RFields } from 'react-final-form'

const Field = styled(RFields)`
  display: block;
  width: 100%;
  height: 36px;
  padding: 8px 16px;
  line-height: 1.5;
  background-color: #FFFFFF;
  border: 1px solid #ced4da;
  border-radius: 4px;
`

export default Field