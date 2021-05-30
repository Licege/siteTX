import React from 'react'
import { Field, Form } from 'react-final-form'
import TextField from '../../../components/common/elements/form/RenderTextField'
import { Button } from '@material-ui/core'
import { profileType, resumeType, vacancyType } from '../../../types/types'
import { dateFormParse } from '../../../plugins/helpers'
import BirthdayPicker from '../../../components/common/elements/BirthdayPicker'
import Datepicker from '../../../components/common/elements/form/RenderDatepicker';

type PropsType = {
    vacancies: vacancyType[]
}

const ResumeForm: React.FC<any> = ({ onSubmit }) => {

    return (
      <Form onSubmit={onSubmit} render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name='surname' component={TextField} label='Фамилия*' placeholder='Введите фамилию'/>
          <Field name='forename' component={TextField} label='Имя*' placeholder='Введите имя'/>
          <Field name='patronymic' component={TextField} label='Отчество' placeholder='Введите отчество'/>
          <Field name='education' component={TextField} label='Образование'
                 placeholder='Укажите ваше образование' multiline rowsMax={6}/>
          {/*Подумать насчет мест работы и опыта*/}
          {/*<Field name='date_birth'*/}
          {/*       component={Datepicker}*/}
          {/*       label='Дата рождения*'*/}
          {/*       placeholder='Укажите дату рождения' />*/}
          <Field name='address'
                 component={TextField}
                 label='Адрес'
                 placeholder='Укажите адрес'
                 as='textarea'
                 rows={6} />
          <Field name='phone' component={TextField} label='Телефон*' placeholder='Укажите телефон'/>
          <Field name='email' component={TextField} label='E-mail' placeholder='Укажите e-mail'/>
          <Button variant='contained' color='primary' type='submit'>Отправить резюме</Button>
        </form>
      )} />

    )
}

export default ResumeForm
