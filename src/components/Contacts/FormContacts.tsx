import React from 'react'
import {InjectedFormProps, reduxForm, Field} from "redux-form";
import renderTextField from "../common/elements/RenderTextField";
import validate from './Validate';
import {Button} from "@material-ui/core";
import {reviewType} from "../../types/types";

const FormContacts: React.FC<InjectedFormProps> = ( {handleSubmit} ) => (
    <form onSubmit={handleSubmit}>
        <div>
            <Field name='name'
                   component={renderTextField}
                   label='Введите имя'
                   placeholder='Ваше имя' />
        </div>
        <div>
            <Field name='phone'
                   component={renderTextField}
                   label='Введите телефон'
                   placeholder='Введите телефон' />
        </div>
        <div>
            <Field name='comment'
                   component={renderTextField}
                   label='Ваш вопрос'
                   placeholder='Введите вопрос'
                   multiline
                   rowsMax={10}
                   margin='normal' />
        </div>
        <Button variant='contained' color='primary' type='submit'>Отправить</Button>
    </form>
)

let reduxFormContacts = reduxForm<reviewType>({
    form: 'contacts-form',
    validate
}) (FormContacts)

export default reduxFormContacts