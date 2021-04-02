import React from 'react'
import { InjectedFormProps, reduxForm, Field } from 'redux-form'
import TextField from '../common/elements/form/RenderTextField'
import Datepicker from '../common/elements/form/RenderDatepicker'
import Select from '../common/elements/form/RenderSelect'
import { Button } from '@material-ui/core'
import validate from './Validate'
import { IOrder } from '../../types/types'
import { scrollToFirstError } from '../../plugins/validate'


const datepickerSettings = () => {
    const today = new Date()
    const maxDate = new Date().setDate(today.getDate() + 30)
    const label = 'Дата и время бронирования'

    return {
        minDate: today,
        maxDate,
        showTimeSelect: true,
        label
    }
}

const FormOrder: React.FC<InjectedFormProps<IOrder>> = ({handleSubmit}) => {
    const optionsCountPerson = Array(10).fill(0).map((_, key) => ({value: key, label: key}))
    return (
        <form onSubmit={handleSubmit}>
            <Field name='name' component={TextField} label='Ваше имя:' placeholder='Введите имя:'/>
            <Field name='phone' component={TextField} label='Контактный телефон'
                   placeholder='Введите телефон'/>
            <Field name='orderDate' component={Datepicker} {...datepickerSettings()} />
            <Field name='countPerson'
                   component={Select}
                   label='Количество гостей'
                   options={optionsCountPerson}
                   defaultValue={optionsCountPerson[0]}
            />
            <Field name='comment'
                   component={TextField}
                   label='Ваши пожелания:'
                   as='textarea'
                   rows={6}
                   placeholder='Здесь вы можете ввести ваши пожелания'
            />
            <div>
                <Button variant='contained' color='primary' type='submit'>Забронировать стол</Button>
            </div>
        </form>
    )
}

let ReduxFormOrder = reduxForm<IOrder>({
    form: 'orderForm',
    initialValues: {
        orderDate: new Date(new Date().setMilliseconds(2 * 60 * 60 * 1000)),
    },
    validate,
    onSubmitFail: (errors => scrollToFirstError(errors)),
    enableReinitialize: true,
})(FormOrder)

export default ReduxFormOrder
