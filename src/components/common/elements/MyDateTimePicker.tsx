import React, {useState} from 'react';
import DatePicker from 'react-datepicker'
import {addDays} from "date-fns";

import "react-datepicker/dist/react-datepicker.css";
import {ru} from "date-fns/locale";


type PropsType = {
    choiceDate: (date: Date) => void
    defaultDate?: Date
}

const MyDateTimePicker: React.FC<PropsType> = ( {choiceDate, defaultDate} ) => {
    const today = new Date()
    const [startDate, setStartDate] = useState(defaultDate || today)

    let handlerChange = (date: any) => {
        setStartDate(date);
        choiceDate(date)
    };

    return (
        <DatePicker selected={startDate}
                    onChange={handlerChange}
                    minDate={today}
                    maxDate={addDays(today, 7)}
                    excludeTimes={[]}
                    excludeDates={[]}
                    locale={ru}
                    placeholderText='Выберите дату и время...'
                    timeCaption='Время'
                    timeFormat='p'
                    dateFormat="d MMMM p"
                    showTimeSelect
                    isClearable
                    className='form-control' />
    )
};

export default MyDateTimePicker;

