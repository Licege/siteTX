import React from 'react'
import { FormControl } from 'react-bootstrap'

import './style.scss'

interface IProps {
    label: string
    placeholder: string
    input: any
    meta: {
        touched: boolean
        invalid: boolean
        error: string
    }
    as?: 'textarea'|'input'
    rows: any
    custom: any
}

const renderTextField: React.FC<IProps> = ({
                                               label,
                                               placeholder,
                                               input,
                                               meta: {touched, invalid, error},
                                               as = 'input',
                                               ...custom
                                           }) => (
        <div className={'field' + ((touched && invalid) ? ' error' : '')}>
            {label ? <label className='field__label' htmlFor={input.name}>{label}</label> : null}
            <FormControl id={input.name}
                         as={as}
                         onChange={input.onChange}
                         defaultValue={input.value}
                         isInvalid={touched && invalid}
                         placeholder={placeholder}
                         {...custom}
            />
            {touched && invalid && error ? <span className='text-field__prompt'>{error}</span> : null}
        </div>
)

export default renderTextField
