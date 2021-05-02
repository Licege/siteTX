import React from 'react'
import { Form, Field } from 'react-final-form'
import { connect } from 'react-redux'
import { deliveryGlobalSettingsType, deliverySettingsType, deliveryType, IDeliveryPost } from '../../../types/types'
import TextField from '../../../components/common/elements/form/RenderTextField'
import Datepicker from '../../../components/common/elements/form/RenderDatepicker'
import validate from '../Validate'
import {
    createStyles,
    FormControl,
    Radio,
    RadioGroup,
    Theme,
} from '@material-ui/core'
import Select from '../../../components/common/elements/form/RenderSelect'
import renderCheckbox from '../../../components/common/elements/form/RenderCheckbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { makeStyles } from '@material-ui/core/styles'
import { scrollToFirstError } from '../../../plugins/validate'
import { rangeNumbers } from '../../../plugins/helpers'
import { useBucketFormOrderLogic } from './logic'
import InfoBlock from './InfoBlock'

const radioButton = ({ input, ...rest }: any) => (
    <FormControl>
        <RadioGroup {...input} {...rest} />
    </FormControl>
)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiFormControl-root': {
                margin: theme.spacing(1),
                width: '220px',
            },
        },
    }),
)

const datepickerSettings = () => {
    const today = new Date()
    const maxDate = new Date().setDate(today.getDate() + 7)
    const label = 'Дата и время доставки'

    return {
        minDate: today,
        maxDate,
        showTimeSelect: true,
        label
    }
}

const FormOrder = () => {
    const classes = useStyles()
    const { onSubmit, initialValues, globalSettings, cityOptions } = useBucketFormOrderLogic()

  return (
        <div className='bucket-order'>
            <Form onSubmit={onSubmit} initialValues={initialValues} render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit} className={classes.root}>
                  <div>
                      <Field name='name'
                             component={TextField}
                             label='Ваше имя:'
                             placeholder='Введите имя' />
                  </div>
                  <div>
                      <Field name='phone'
                             component={TextField}
                             label='Контактный телефон'
                             placeholder='Введите телефон' />
                  </div>
                  <div>
                      <Field name='email'
                             component={TextField}
                             label='E-mail'
                             placeholder='Введите e-mail' />
                  </div>
                  <div>
                      <div>
                          <label>Выберите способ оплаты:</label>
                      </div>
                      <Field name='paymentType' component={radioButton}>
                          {globalSettings.paymentCash &&
                          <FormControlLabel value='cash'
                                            control={<Radio/>}
                                            label='Наличная оплата' />
                          }
                          {globalSettings.paymentCashless &&
                          <FormControlLabel value='cashlessPayment'
                                            control={<Radio/>}
                                            label='Безналичный расчет курьеру' />
                          }
                          {globalSettings.paymentOnline &&
                          <FormControlLabel value='cashlessPaymentOnline'
                                            control={<Radio/>}
                                            label='Безналичный расчет онлайн' />}
                      </Field>
                      {values.paymentType === 'cash' && <div className='bucket-order__cash'>
                          Подготовить сдачу с
                          <Field name='oddMoney' component={TextField} label='' placeholder='0'/> рублей
                      </div>}
                  </div>
                  <div>
                      <div>
                          <label>Выберите способ доставки:</label>
                      </div>
                      {/*<Field name='deliveryType' component={radioButton} type='radio'>*/}
                      {/*    {globalSettings.isDeliveryWorking &&*/}
                      {/*    <FormControlLabel value='home' control={<Radio/>} label='На дом'/>}*/}
                      {/*    <FormControlLabel value='restaurant' control={<Radio/>} label='Самовывоз из ресторана'/>*/}
                      {/*</Field>*/}
                    {globalSettings.isDeliveryWorking &&
                    <Field name='deliveryType' value='home' component='input' type='radio' label='На дом'/>}
                    <Field name='deliveryType' value='restaurant' component='input' type='radio' label='Самовывоз из ресторана'/>
                  </div>
                  {values.deliveryType === 'home'
                    ?
                    <>
                        <div>
                            <Field name='address.city' component={Select} label='Город' options={cityOptions} defaultValue={cityOptions[0]} />
                        </div>
                        <div>
                            <Field name='address.street' component={TextField} label='Улица'
                                   placeholder='Введите название улицы'/>
                        </div>
                        <div>
                            <Field name='address.house' component={TextField} label='Дом'
                                   placeholder='Введите номер дома'/>
                        </div>
                        <div>
                            <Field name='address.flat' component={TextField} label='Квартира'
                                   placeholder='Введите номер'/>
                        </div>
                        <div>
                            <Field name='address.intercom' component={TextField} label='Домофон'
                                   placeholder='Введите код' />
                        </div>
                        <div>
                            <Field name='address.floor' component={TextField} label='Этаж' placeholder='Этаж'/>
                        </div>
                    </>
                    :
                    <div>
                        <label>Выберите адрес ресторана:</label>
                    </div>
                  }
                  {/*<Field name='timeDelivery' component={Datepicker} {...datepickerSettings()} />*/}
                  <div>
                      <Field name='countPerson'
                             parse={(value: string) => value !== '' ? Number(value) : ''}
                             normalize={(value: number) => rangeNumbers(value, 0, 20)}
                             type='number'
                             component={TextField}
                             label='Количество персон'
                             placeholder='Количество персон'/>
                  </div>
                  <div>
                      <Field name='comment'
                             component={TextField}
                             as='textarea'
                             label='Пожелания к заказу'
                             placeholder='Опишите ваши пожелания'
                             rows={6}
                      />
                  </div>
                  <div>
                      <Field name='ruleAgree'
                             className='bucket-order__polit'
                             type='checkbox'
                             component={renderCheckbox}
                             label='Я согласен на обработку своих персональных данных и принимаю условия Политики конфиденциальности и Пользовательского соглашения'/>
                  </div>

                  <InfoBlock />
              </form>
            )} />

        </div>
    )
}

// let ReduxFormOrder = reduxForm<IDeliveryPost & IMapStateToProps, PropsType>({
//     form: 'bucketOrderForm',
//     validate,
//     onSubmitFail: (errors => scrollToFirstError(errors)),
//     enableReinitialize: true,
// })(FormOrder)

// const selector = formValueSelector('bucketOrderForm')
// export default connect(
//     state => selector(state, 'paymentType', 'deliveryType')
// )(FormOrder)

export default FormOrder
