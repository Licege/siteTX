import React from 'react'
import {KeyboardDatePicker} from "@material-ui/pickers";
import {ru} from "date-fns/locale";

const BirthdayPicker = (props: any) => {
    const {
        meta: { error, touched },
        input: { onBlur, value, ...inputProps },
        ...others
    } = props

    const onChange = (date: any) => {
        Date.parse(date) ? inputProps.onChange(date.toISOString()) : inputProps.onChange(null)
    }

    return (
        <KeyboardDatePicker  {...inputProps}
                             {...others}
                             variant="inline"
                             format="dd/MM/yyyy"
                             openTo="year"
                             views={["year", "month", "date"]}
                             value={value ? new Date(value) : null}
                             onBlur={() => onBlur(value ? new Date(value).toISOString() : null)}
                             error={error && touched}
                             locale={ru}
                             disableFuture
                             autoOk
                             onChange={onChange} />
    )
}

export default BirthdayPicker;