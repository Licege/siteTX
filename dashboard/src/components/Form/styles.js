import styled from "styled-components";
import NumberFormat from "react-number-format";

export const Wrapper = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`

export const CustomNumberFormat = styled(NumberFormat)`
  display: block;
  width: 100%;
  height: 36px;
  padding: 8px 16px;
  line-height: 1.5;
  background-color: #FFFFFF;
  border: 1px solid #ced4da;
  border-radius: 4px;
`