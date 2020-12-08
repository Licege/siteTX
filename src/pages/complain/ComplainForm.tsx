import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import Select from '../../components/common/elements/form/RenderSelect'
import Datepicker from '../../components/common/elements/form/RenderDatepicker'
import TextField from '../../components/common/elements/form/RenderTextField'
import Button from '@material-ui/core/Button'
import validate from './Validate'
import { complainType,  selectOptionsType } from '../../types/types';

interface PropsType {
    types: selectOptionsType[]
}

interface IMapStateToProps {
    form: string
    enableReinitialize: boolean
}

type FormType = InjectedFormProps<IMapStateToProps & complainType, PropsType> & PropsType

const ComplainForm: React.FC<FormType> = ({ types, handleSubmit }) => {
    return (
        <div className='complain-form__container'>
            <form className='complain-form' onSubmit={handleSubmit}>
                <Field name='typeId' component={Select} options={types} defaultValue={types[0]} label='Тема обращения'/>
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

const ComplainReduxForm = reduxForm<complainType & IMapStateToProps, PropsType>({
    form: 'complain-redux-form',
    validate,
    enableReinitialize: true
})(ComplainForm)

export default ComplainReduxForm