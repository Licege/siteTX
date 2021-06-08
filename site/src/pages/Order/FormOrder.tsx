import React from 'react'
import { Form, Field } from 'react-final-form'
import TextField from '../../components/common/elements/form/RenderTextField'
import Datepicker from '../../components/common/elements/form/RenderDatepicker'
import Select from '../../components/common/elements/form/RenderSelect'
import validate from './Validate'
import { IOrder } from '../../types/types'
import { scrollToFirstError } from '../../plugins/validate'
import { Button } from '../../components/core'
import styled from 'styled-components';
import { BREAKPOINTS } from '../../styledComponents/helpers'


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

const FormOrder: React.FC<any> = ({ onSubmit }) => {
    const optionsCountPerson = Array(10).fill(0).map((_, key) => ({value: key, label: key}))
    return (
      <Form onSubmit={onSubmit} render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name='name' component={TextField} label='Ваше имя:' placeholder='Введите имя:'/>
          <Field name='phone' component={TextField} label='Контактный телефон'
                 placeholder='Введите телефон'/>
          {/*<Field name='orderDate' component={Datepicker} {...datepickerSettings()} />*/}
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
            <SubmitButton variant='contained' color='primary' type='submit'>Забронировать стол</SubmitButton>
          </div>
        </form>
      )} />
    )
}

const SubmitButton = styled(Button)`
  @media (max-width: ${BREAKPOINTS['ts']}px) {
    width: 100%;
  }
`

// let ReduxFormOrder = reduxForm<IOrder>({
//     form: 'orderForm',
//     initialValues: {
//         orderDate: new Date(new Date().setMilliseconds(2 * 60 * 60 * 1000)),
//     },
//     validate,
//     onSubmitFail: (errors => scrollToFirstError(errors)),
//     enableReinitialize: true,
// })(FormOrder)

export default FormOrder
