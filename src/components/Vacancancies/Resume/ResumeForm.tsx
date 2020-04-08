import React from 'react'
import {InjectedFormProps, reduxForm, Field} from "redux-form";
import renderTextField from "../../common/elements/RenderTextField";
import {Button} from "@material-ui/core";
import MyReactDateTimePicker from "../../common/elements/MyReactDateTimePicker";
import {vacancyType} from "../../../types/types";
import {dateFormParse} from "../../../plugins/helpers";

interface IProps {
    vacancies: Array<vacancyType>
}

const ResumeForm: React.FC<InjectedFormProps & IProps> = ( {handleSubmit} ) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name='surname' component={renderTextField} label='Фамилия*' placeholder='Введите фамилию' />
            </div>
            <div>
                <Field name='name' component={renderTextField} label='Имя*' placeholder='Введите имя' />
            </div>
            <div>
                <Field name='patronymic' component={renderTextField} label='Отчество' placeholder='Введите отчество' />
            </div>
            <div>
                <Field name='education' component={renderTextField} label='Образование' placeholder='Укажите ваше образование' multiline rowsMax={6} />
            </div>
            {/*Подумать насчет мест работы и опыта*/}
            <div>
                <Field name='date_birth' component={MyReactDateTimePicker} label='Дата рождения*' placeholder='Укажите дату рождения' parse={dateFormParse} />
            </div>
            <div>
                <Field name='address' component={renderTextField} label='Адрес' placeholder='Укажите адрес' multiline rowsMax={6} />
            </div>
            <div>
                <Field name='phone' component={renderTextField} label='Телефон*' placeholder='Укажите телефон' />
            </div>
            <div>
                <Field name='email' component={renderTextField} label='E-mail' placeholder='Укажите e-mail' />
            </div>
            <Button variant='contained' color='primary' type='submit'>Отправить резюме</Button>
        </form>
    )
}

let ReduxResumeForm = reduxForm<{}, IProps>({
    form: 'resume-form',
    enableReinitialize: true}) (ResumeForm)

export default ReduxResumeForm;