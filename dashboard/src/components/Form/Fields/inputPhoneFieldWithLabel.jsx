import React from 'react';
import InputPhoneField from './inputPhoneField';
import {Wrapper} from '../styles';

const InputPhoneFieldWithLabel = ({label, ...props}) => (
  <Wrapper>
    <div>{label}</div>
    <InputPhoneField { ...props } />
  </Wrapper>
)

export default InputPhoneFieldWithLabel