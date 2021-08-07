import React from 'react'
import styled from 'styled-components'
import { InputField, TextareaField } from '../../components/Form'

const commonStyles = () => `
  margin-bottom: 20px;
`

export const SCInputField = styled(InputField)`
  ${commonStyles()}
`

export const SCTextareaField = styled(TextareaField)`
  ${commonStyles()}
  min-height: 64px;
`