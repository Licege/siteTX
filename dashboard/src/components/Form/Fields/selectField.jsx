import React from 'react'
import Select from 'react-select'
import {Field} from 'react-final-form'

const ReactSelectAdapter = ({input, ...rest}) => (
  <Select {...input} {...rest} />
)

const SelectField = ({options, ...props}) => (
  <Field component={ReactSelectAdapter} {...props} options={options} />
)

export default SelectField

