import React from 'react'
import { InjectedFormProps, reduxForm, Field } from 'redux-form'
import renderTextField from '../../components/common/elements/form/RenderTextField';
import { scrollToFirstError } from '../../plugins/validate';
import { IOrder } from '../../types/types';
import { Button } from '@material-ui/core';
import DateTimeField from '../../components/common/elements/MaterialDateTimePicker';

const FormEditProfile: React.FC<InjectedFormProps<IOrder>> = ({ handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name='surname' component={renderTextField} label='Ваша фамилия:' placeholder='Введите фамилию:'/>
            </div>
            <div>
                <Field name='forename' component={renderTextField} label='Ваше имя:' placeholder='Введите имя:'/>
            </div>
            <div>
                <Field name='patronymic' component={renderTextField} label='Ваше отчество:' placeholder='Введите отчество:'/>
            </div>
            <div>
                <Field name='birthday' component={DateTimeField}/>
            </div>
            <div>
                <Field name='phone' component={renderTextField} label='Телефон:' placeholder='+7 (***) ***-**-**'/>
            </div>
            <div className='mt-4'>
                <Button variant='contained' color='primary' type='submit'>Сохранить</Button>
            </div>
        </form>
    )
}

export default reduxForm<any>({
    form: 'profileEdit',
    onSubmitFail: (errors => scrollToFirstError(errors)),
    enableReinitialize: true,
})(FormEditProfile);