import React from 'react'
import DatePicker from 'react-datepicker'
import { addDays } from 'date-fns'

import 'react-datepicker/dist/react-datepicker.css'
import { ru } from 'date-fns/locale'


interface IProps {
    input: any
    placeholder: any
    defaultValue: any
    meta: any
}

const MyReactDateTimePicker: React.FC<IProps> = ( { input: { value, onChange, ...inputProps }, placeholder, meta: { touched, error } } ) => {
  const now = new Date()

  const handlerChange = ( date: any ) => {
    filterDateTime(date)
    onChange(date)
  }

  let filterDateTime = ( nextDate: any ) => {
    console.log(nextDate >= now)
    // console.log(today.setHours(today.getHours()+1))
  }

  return (
    <div>
      <DatePicker {...inputProps}
                  selected={value || null}
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
                  className='MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedEnd'/>
      {touched && error && <p className='MuiFormHelperText-root Mui-error'>{error}</p>}
    </div>
  )
}

export default MyReactDateTimePicker

