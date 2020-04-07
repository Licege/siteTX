import React from 'react'
import {KeyboardDateTimePicker} from "@material-ui/pickers";

const DateTimeField = ( props: any ) => {
    const {
        meta: { submitting, error, touched },
        input: { onBlur, value, ...inputProps },
        ...others
    } = props

    const onChange = (date: any) => {
        Date.parse(date) ? inputProps.onChange(date.toISOString()) : inputProps.onChange(null)
    }

    return (
            <KeyboardDateTimePicker
                {...inputProps}
                {...others}
                variant="inline"
                format="HH:mm dd/MM/yyy"
                value={value ? new Date(value) : null}
                onBlur={() => onBlur(value ? new Date(value).toISOString() : null)}
                error={error && touched}
                disablePast
                maxDate={new Date()}
                ampm={false}
                onChange={onChange} />
    )
}

export default DateTimeField;