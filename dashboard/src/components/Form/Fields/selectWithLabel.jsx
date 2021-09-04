import React from "react";
import SelectField from './selectField';
import { Wrapper } from "../styles";

const SelectFieldWithLabel = ({ label, ...props }) => (
  <Wrapper>
    <div>{label}</div>
    <SelectField { ...props } />
  </Wrapper>
)

export default SelectFieldWithLabel