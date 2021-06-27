import React from 'react'
import Datepicker, { registerLocale } from 'react-datepicker'
import ru from 'date-fns/locale/ru'

import 'react-datepicker/dist/react-datepicker.css'
import { FormControl } from 'react-bootstrap';

registerLocale('ru', ru)

interface IProps {
    label: string
    placeholder: string
    input: {
        name: string,
        value: Date | null,
        onChange: () => void
    }
    meta: {
        touched: boolean
        invalid: boolean
        error: string
    }
    maxDate?: Date | null
    maxTime?: Date
    minDate?: Date | null
    minTime?: Date
    excludeTimes?: Date[]
    excludeDates?: Date[]
    timeCaption?: string
    dateFormat?: string
    filterDate?: () => boolean
    showTimeSelect?: boolean
    isClearable?: boolean
    custom: any
}

const renderDatepicker: React.FC<IProps> = ({
  input: { name, value, onChange },
  meta: { invalid, touched, error },
  label,
  maxDate = new Date(),
  maxTime,
  minDate,
  minTime,
  excludeTimes = [],
  excludeDates = [],
  timeCaption = 'Время',
  dateFormat = '',
  filterDate,
  showTimeSelect = false,
  isClearable = false,
  ...custom
}) => {
  // eslint-disable-next-line no-nested-ternary
  const datetimeFormat = !dateFormat
    ? (showTimeSelect ? 'dd/MM/yyyy в HH:mm' : 'dd/MM/yyyy')
    : dateFormat

  return (
    <div className={`field${  (touched && invalid) ? ' error' : ''}`}>
      {label ? <label className='field__label' htmlFor={name}>{label}</label> : null}
      <Datepicker id={name}
                  selected={value}
                  onChange={onChange}
                  locale='ru'
                  maxDate={maxDate}
                  minDate={minDate}
                  maxTime={maxTime}
                  minTime={minTime}
                  timeCaption={timeCaption}
                  isClearable={isClearable}
                  dateFormat={datetimeFormat}
                  filterDate={filterDate}
                  excludeTimes={excludeTimes}
                  excludeDates={excludeDates}
                  showTimeSelect={showTimeSelect}
                  wrapperClassName='field__datepicker'
                  customInput={<FormControl/>}
                  {...custom}/>
      {touched && invalid && error ? <span className='text-field__prompt'>{error}</span> : null}
    </div>
  )
}

export default renderDatepicker