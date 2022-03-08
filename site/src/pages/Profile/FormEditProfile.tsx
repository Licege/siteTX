import React from 'react'
import { Form, Field } from 'react-final-form'
import renderTextField from '../../components/common/elements/form/RenderTextField'
// import { scrollToFirstError } from '../../plugins/validate'
// import { IOrder } from '../../types/types'
import DateTimeField from '../../components/common/elements/MaterialDateTimePicker';
import { Button } from '../../components/core'


const FormEditProfile: React.FC<any> = ({ onSubmit }) => (
  <Form onSubmit={onSubmit} render={({ handleSubmit }) => (
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
    )} />
)

// export default reduxForm<any>({
//     form: 'profileEdit',
//     onSubmitFail: (errors => scrollToFirstError(errors)),
//     enableReinitialize: true,
// })(FormEditProfile);

export default FormEditProfile