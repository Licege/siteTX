import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import Select from '../../components/common/elements/form/RenderSelect'
import renderTextField from '../../components/common/elements/form/RenderTextField'
import Button from '@material-ui/core/Button'

const ComplainForm = () => {
    const complainType = ['Благодарность', 'Качество и вкус блюд', 'Неверный или неполный заказ', 'Обслуживание', 'Долгое ожидание', 'Вопрос по акции', 'Вопрос по доставке', 'Предложения', 'Другое']
    const options = complainType.map((label, value) => ({ label, value }))

    const ComplainOptions = () => {
        return (
            <div>
                <div>Тема обращения</div>
                <Field name='type' component={Select} options={options} defaultValue={options[0]} />
            </div>
        )
    }

    return (
        <div className='complain-form__container'>
            <form className='complain-form'>
                <Field name='type' component={Select} options={options} defaultValue={options[0]} label='Тема обращения' />
                <div className='complain-form__field'>
                    <Field name='name' component={renderTextField} label='Ваше имя' />
                </div>
                <div className='complain-form__row'>
                    <div className='complain-form__field'>
                        <Field name='email' component={renderTextField} label='Ваш e-mail' />
                    </div>
                    <div className='complain-form__field'>
                        <Field name='phone' component={renderTextField} label='Ваш телефон' />
                    </div>
                </div>
                <div className='complain-form__row'>
                    <div className='complain-form__field'>
                        <div>Дата посещения</div>
                        <Field name='visitDate' component={renderTextField} />
                    </div>
                    <div className='complain-form__field'>
                        <div>Время посещения</div>
                        <Field name='visitTime' component={renderTextField} />
                    </div>
                </div>
                <div>
                    <Field name='text' component={renderTextField} label='Сообщение' as='textarea' rows={6} />
                </div>
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