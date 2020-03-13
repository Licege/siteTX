import React, {useState} from 'react';
import DatePicker from 'react-datepicker'
import {addDays} from "date-fns";
//import 'moment/locale/ru';

import "react-datepicker/dist/react-datepicker.css";
import {ru} from "date-fns/locale";

type PropsType = {
    choiceDate: (date: Date | null) => (void)
}

const MyDateTimePicker: React.FC<PropsType> = ( {choiceDate} ) => {
    const [startDate, setStartDate] = useState(null);

    let handlerChange = (date: any) => {
        setStartDate(date);
        choiceDate(date)
    };

    return (
        <DatePicker selected={startDate}
                    onChange={handlerChange}
                    minDate={new Date()}
                    maxDate={addDays(new Date(), 7)}
                    excludeTimes={[]}
                    excludeDates={[]}
                    locale={ru}
                    placeholderText='Выберите дату и время...'
                    timeCaption='Время'
                    timeFormat='p'
                    dateFormat="p ч, d MMMM"
                    showTimeSelect
                    isClearable />
    )
};

export default MyDateTimePicker;

