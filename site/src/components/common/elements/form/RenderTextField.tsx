import React from 'react'
import { FormControl } from 'react-bootstrap'
import { FieldRenderProps } from 'react-final-form';

import './style.scss'

const renderTextField: React.FC<FieldRenderProps<any>> = ({
  label,
  placeholder,
  input: { name, value, onChange },
  meta: { touched, invalid, error },
  as = 'input',
  ...custom
}: FieldRenderProps<any>) => (
  <div className={`field${  (touched && invalid) ? ' error' : ''}`}>
    {label ? <label className='field__label' htmlFor={name}>{label}</label> : null}
    <FormControl id={name}
                 as={as}
                 onChange={onChange}
                 defaultValue={value}
                 isInvalid={touched && invalid}
                 placeholder={placeholder}
                 {...custom}/>
    {touched && invalid && error ? <span className='text-field__prompt'>{error}</span> : null}
  </div>
)

export default renderTextField
