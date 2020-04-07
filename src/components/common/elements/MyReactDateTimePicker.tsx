import React, {useState} from 'react';
import DatePicker from 'react-datepicker'
import {addDays, isSameDay, startOfToday} from "date-fns";

import "react-datepicker/dist/react-datepicker.css";
import {ru} from "date-fns/locale";
import FormHelperText from '@material-ui/core/FormHelperText';

/*
type PropsType = {
    choiceDate: (date: Date) => void
    defaultDate?: Date
}
 */

interface IProps {
    input: any
    placeholder: any
    defaultValue: any
    meta: any
}

const MyReactDateTimePicker: React.FC<IProps> = ({ input: {value, onChange, ...inputProps}, placeholder, meta: {touched, error} }) => {
    const now = new Date()
    let todayPlus2 = now.setHours(new Date().getHours() + 1)
    let todayPlus10 = now.setHours(new Date().getHours() + 10)

    let handlerChange = (date: any) => {
        filterDateTime(date)
        onChange(date)
    };

    let filterDateTime = (nextDate: any) => {
        console.log(nextDate >= now)
        //console.log(today.setHours(today.getHours()+1))
    }

    return (
        <div>
                <DatePicker {...inputProps}
                            selected={value ? value : null}
                            onChange={handlerChange}
                            minDate={now}
                            maxDate={addDays(now, 7)}
                            excludeTimes={[]}
                            excludeDates={[]}
                            locale={ru}
                            placeholderText={placeholder}
                            timeCaption='Время'
                            timeFormat='p'
                            dateFormat="d MMMM p"
                            showTimeSelect
                            isClearable
                            autoComplete='off'
                            className='MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedEnd'
                />
            {touched && error && <p className='MuiFormHelperText-root Mui-error'>{error}</p>}
        </div>
    )
};

export default MyReactDateTimePicker;

