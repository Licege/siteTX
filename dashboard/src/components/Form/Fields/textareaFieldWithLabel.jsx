import React from 'react';
import TextareaField from './textareaField';
import {Wrapper} from '../styles';

const TextareaFieldWithLabel = ({label, ...props}) => (
  <Wrapper>
    <div>{label}</div>
    <TextareaField { ...props } />
  </Wrapper>
)

export default TextareaFieldWithLabel