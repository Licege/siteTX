import React from 'react'
import { FormControl } from 'react-bootstrap'

import './style.scss'

interface IProps {
    label: string
    placeholder: string
    input: {
        name: string,
        value: string,
        onChange: () => void
    }
    meta: {
        touched: boolean
        invalid: boolean
        error: string
    }
    as?: 'textarea' | 'input'
    rows: any
    custom: any
}

const renderTextField: React.FC<IProps> = ({
                                               label,
                                               placeholder,
                                               input: { name, value, onChange },
                                               meta: { touched, invalid, error },
                                               as = 'input',
                                               ...custom
                                           }) => (
    <div className={'field' + ((touched && invalid) ? ' error' : '')}>
        {label ? <label className='field__label' htmlFor={name}>{label}</label> : null}
        <FormControl id={name}
                     as={as}
                     onChange={onChange}
                     defaultValue={value}
                     isInvalid={touched && invalid}
                     placeholder={placeholder}
                     {...custom}
        />
        {touched && invalid && error ? <span className='text-field__prompt'>{error}</span> : null}
    </div>
)

export default renderTextField
