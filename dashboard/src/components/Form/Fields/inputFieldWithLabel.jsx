import React from 'react';
import InputField from './inputField';
import {Wrapper} from '../styles';

const InputFieldWithLabel = ({label, ...props}) => (
  <Wrapper>
    <div>{label}</div>
    <InputField { ...props } />
  </Wrapper>
)

export default InputFieldWithLabel