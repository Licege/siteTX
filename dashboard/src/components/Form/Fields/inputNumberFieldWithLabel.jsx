import React from "react";
import InputNumberField from './inputNumberField';
import { Wrapper } from "../styles";

const InputNumberFieldWithLabel = ({ label, ...props }) => (
  <Wrapper>
    <div>{label}</div>
    <InputNumberField { ...props } />
  </Wrapper>
)

export default InputNumberFieldWithLabel