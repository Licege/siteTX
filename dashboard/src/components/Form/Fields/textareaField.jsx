import React from 'react'
import { Field } from '../../../styledComponents/atoms'
import styled from "styled-components";

const TextareaField = ({ ...props }) => <Textarea component='textarea' {...props} rows={10} />

const Textarea = styled(Field)`
  min-height: 64px;
`

export default TextareaField

