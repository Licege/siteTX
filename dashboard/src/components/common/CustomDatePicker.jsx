import React from 'react'
import DatePicker, {registerLocale} from 'react-datepicker'
import ru from 'date-fns/locale/ru'

import 'react-datepicker/dist/react-datepicker.css'

registerLocale('ru', ru)

export const CustomDatePicker = ( {value, placeholder, handleChange, isClearable} ) => (
  <div className='filter-main-input -name'>
    <DatePicker selected={value}
                onChange={handleChange}
                className='form-control'
                placeholder={placeholder}
                dateFormat='dd/MM/yyyy'
                locale='ru'
                isClearable={isClearable}/>
  </div>
)
