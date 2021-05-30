import React from 'react'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { ru } from 'date-fns/locale'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            '& .MuiButtonBase-root': {
                outline: 'none',
            },
        },
    }),
)

const BirthdayPicker = (props: any) => {
    const {
        meta: { error, touched },
        input: { onBlur, value, ...inputProps },
        ...others
    } = props

    const onChange = (date: any) => {
        Date.parse(date) ? inputProps.onChange(date.toISOString()) : inputProps.onChange(null)
    }

    const classes = useStyles()

    return (
        <KeyboardDatePicker  {...inputProps}
                             {...others}
                             className={classes.root}
                             variant="inline"
                             format="dd/MM/yyyy"
                             openTo="year"
                             views={['year', 'month', 'date']}
                             value={value ? new Date(value) : null}
                             onBlur={() => onBlur(value ? new Date(value).toISOString() : null)}
                             error={error && touched}
                             locale={ru}
                             disableFuture
                             autoOk
                             onChange={onChange}/>
    )
}

export default BirthdayPicker
