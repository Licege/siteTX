import React from 'react'
import { Field } from 'react-final-form'

const FormControl = ({ input, meta: { touched, error }, children }) => {
    //const hasError = touched && error;
    return (
        <div>
            {children}
        </div>
    )
}

export const onlyNumber = ( value ) => {
    //const regEx = /[^0-9]/gi;
    return parseInt(value, 10)
}

export const Input = ( props ) => {
    const { input, meta, child, ...restProps } = props
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

export const Textarea = ( props ) => {
    const { input, meta, child, ...restProps } = props
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const createField = ( placeholder, name, validators, component, type = 'text', props = {}, text = '' ) => (
    <div>
        <Field placeholder={placeholder}
               name={name}
               component={component}
               className="filter-main-input -name form-control"
               type={type}
               {...props}
        /> {text}
    </div>
)
