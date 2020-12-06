import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import Select from '../../components/common/elements/form/RenderSelect'
import Datepicker from '../../components/common/elements/form/RenderDatepicker'
import TextField from '../../components/common/elements/form/RenderTextField'
import Button from '@material-ui/core/Button'

const ComplainForm = () => {
    const complainType = ['Благодарность', 'Качество и вкус блюд', 'Неверный или неполный заказ', 'Обслуживание', 'Долгое ожидание', 'Вопрос по акции', 'Вопрос по доставке', 'Предложения', 'Другое']
    const options = complainType.map((label, value) => ({label, value}))

    const ComplainOptions = () => {
        return (
            <div>
                <div>Тема обращения</div>
                <Field name='type' component={Select} options={options} defaultValue={options[0]}/>
            </div>
        )
    }

    return (
        <div className='complain-form__container'>
            <form className='complain-form'>
                <Field name='type' component={Select} options={options} defaultValue={options[0]} label='Тема обращения'/>
                <Field name='name' component={TextField} label='Ваше имя'/>
                <div className='complain-form__row'>
                    <Field name='email' component={TextField} label='Ваш e-mail'/>
                    <Field name='phone' component={TextField} label='Ваш телефон'/>
                </div>
                <Field name='visitDate' component={Datepicker} label='Дата и время посещения'/>
                <Field name='text' component={TextField} label='Сообщение' as='textarea' rows={6}/>
                <div className='complain-form__actions'>
                    <Button variant='contained' color='primary' type='submit'>Отправить</Button>
                </div>
            </form>
        </div>
    )
}

const ComplainReduxForm = reduxForm({
    form: 'complain-redux-form',
    enableReinitialize: true
})(ComplainForm)

export default ComplainReduxForm