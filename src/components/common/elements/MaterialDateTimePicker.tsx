import React from 'react'
import { KeyboardDateTimePicker } from '@material-ui/pickers'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles(( theme: Theme ) =>
    createStyles({
        root: {
            '& .MuiButtonBase-root': {
                outline: 'none',
            },
        },
    }),
)

const DateTimeField = ( props: any ) => {
    const {
        meta: {error, touched},
        input: {onBlur, value, ...inputProps},
        ...others
    } = props

    const today = new Date()

    const onChange = ( date: any ) => {
        Date.parse(date) ? inputProps.onChange(date.toISOString()) : inputProps.onChange(null)
    }

    const classes = useStyles()

    return (
        <KeyboardDateTimePicker
            {...inputProps}
            {...others}
            className={classes.root}
            variant="inline"
            format="HH:mm dd/MM/yyyy"
            value={value ? new Date(value) : null}
            onBlur={() => onBlur(value ? new Date(value).toISOString() : null)}
            error={error && touched}
            disablePast
            maxDate={today.setDate(today.getDate() + 30)}
            ampm={false}
            minutesStep={5}
            onChange={onChange}/>
    )
}

export default DateTimeField
