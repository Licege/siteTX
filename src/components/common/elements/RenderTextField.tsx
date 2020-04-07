import React from 'react';
import {TextField} from "@material-ui/core";

interface IProps {
    label: string
    placeholder: string
    input: string
    meta: {
        touched: boolean
        invalid: boolean
        error: string
    }
    custom: any
}

const renderTextField: React.FC<IProps> = ({
    label,
    placeholder,
    input,
    meta: { touched, invalid, error },
    ...custom
}) => (
    <TextField
        label={label}
        placeholder={placeholder}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom} />
)

export default renderTextField;