import React from 'react'
import styled from 'styled-components'
import { InputField, TextareaField, SelectField } from '../../components/Form'

const commonStyles = () => `
  flex: 0 0 200px;
  max-width: 200px;
  margin-bottom: 20px;
`

export const SCInputField = styled(InputField)`
  ${commonStyles()}
`

export const SCTextareaField = styled(TextareaField)`
  ${commonStyles()}
  min-height: 64px;
`

export const SCSelectField = styled(SelectField)`
  ${commonStyles()}
`