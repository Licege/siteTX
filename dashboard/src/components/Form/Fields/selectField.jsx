import React from 'react'
import { Field } from '../../../styledComponents/atoms'

const EmptyOption = ({ withEmptyOption = false, emptyOptionTitle = '' }) =>
  Boolean(withEmptyOption) && <option>{emptyOptionTitle}</option>

const SelectField = ({ options, emptyOptionTitle, withEmptyOption, ...props }) => (
  <Field component='select' {...props}>
    <EmptyOption emptyOptionTitle={emptyOptionTitle} withEmptyOption={withEmptyOption} />
    {options.map(({ value, name }) => (
      <option value={value} key={value}>{name}</option>
    ))}
  </Field>
)

export default SelectField

