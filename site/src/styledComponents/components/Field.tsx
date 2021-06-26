import { Field } from 'react-final-form';
import styled from 'styled-components';

export default styled(Field)`
  .error {
    .text-field__prompt {
      line-height: 32px;
      margin-left: 10px;
      color: #800;
      font-weight: bold;
    }
  }
`
