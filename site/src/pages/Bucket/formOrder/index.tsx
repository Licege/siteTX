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
  Theme
} from '@material-ui/core'
import Select from '../../../components/common/elements/form/RenderSelect'
import renderCheckbox from '../../../components/common/elements/form/RenderCheckbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { makeStyles } from '@material-ui/core/styles'
import { scrollToFirstError } from '../../../plugins/validate'
import { rangeNumbers } from '../../../plugins/helpers'
import { useBucketFormOrderLogic } from './logic'
import InfoBlock from './InfoBlock'
import { Radios } from 'mui-rff'
import styled from 'styled-components'

const radioButton = ({input, ...rest}: any) => (
  <FormControl>
    <RadioGroup {...input} {...rest} />
  </FormControl>
)

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiFormControl-root': {
        margin: theme.spacing(1),
        width: '220px'
      }
    }
  })
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
    <main>
      <Form onSubmit={onSubmit} initialValues={initialValues} render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit} className={classes.root}>
          <div>
            <Field name="name"
                   component={TextField}
                   label="Ваше имя:"
                   placeholder="Введите имя"
            />
          </div>
          <div>
            <Field name="phone"
                   component={TextField}
                   label="Контактный телефон"
                   placeholder="Введите телефон"
            />
          </div>
          <div>
            <Field name="email"
                   component={TextField}
                   label="E-mail"
                   placeholder="Введите e-mail"
            />
          </div>
          <div>
            <Radios name="paymentType" label="Выберите способ оплаты:" data={[
              {label: 'Наличная оплата', value: 'cash', disabled: !globalSettings.paymentCash},
              {
                label: 'Безналичный расчет курьеру',
                value: 'cashlessPayment',
                disabled: !globalSettings.paymentCashless
              },
              {
                label: 'Безналичный расчет онлайн',
                value: 'cashlessPaymentOnline',
                disabled: !globalSettings.paymentOnline
              }
            ]}
            />
            {values.paymentType === 'cash' &&
              <OddMoneyBlock>
                Подготовить сдачу с <Field name="oddMoney" component={TextField} label="" placeholder="0" /> рублей
              </OddMoneyBlock>
            }
          </div>
          <div>
            <Radios name="deliveryType" label="Выберите способ доставки:" data={[
              {label: 'На дом', value: 'home', disabled: !globalSettings.isDeliveryWorking},
              {label: 'Самовывоз из ресторана', value: 'restaurant'}
            ]}
            />
          </div>
          {values.deliveryType === 'home'
            ?
            <>
              <div>
                <Field name="address.city"
                       component={Select}
                       label="Город"
                       options={cityOptions}
                       defaultValue={cityOptions[0]}
                />
              </div>
              <div>
                <Field name="address.street" component={TextField} label="Улица" placeholder="Введите название улицы" />
              </div>
              <div>
                <Field name="address.house" component={TextField} label="Дом" placeholder="Введите номер дома" />
              </div>
              <div>
                <Field name="address.flat" component={TextField} label="Квартира" placeholder="Введите номер" />
              </div>
              <div>
                <Field name="address.intercom" component={TextField} label="Домофон" placeholder="Введите код" />
              </div>
              <div>
                <Field name="address.floor" component={TextField} label="Этаж" placeholder="Этаж" />
              </div>
            </>
            :
            <div>
              <label>Выберите адрес ресторана:</label>
            </div>
          }
          {/*<Field name='timeDelivery' component={Datepicker} {...datepickerSettings()} />*/}
          <div>
            <Field name="countPerson"
                   parse={(value: string) => value !== '' ? Number(value) : ''}
                   normalize={(value: number) => rangeNumbers(value, 0, 20)}
                   type="number"
                   component={TextField}
                   label="Количество персон"
                   placeholder="Количество персон"
            />
          </div>
          <div>
            <Field name="comment"
                   component={TextField}
                   as="textarea"
                   label="Пожелания к заказу"
                   placeholder="Опишите ваши пожелания"
                   rows={6}
            />
          </div>
          <div>
            <RuleAgree name="ruleAgree" type="checkbox" component={renderCheckbox}
                       label="Я согласен на обработку своих персональных данных и принимаю условия Политики конфиденциальности и Пользовательского соглашения"
            />
          </div>
          <InfoBlock />
        </form>
      )}
      />
    </main>
  )
}

const OddMoneyBlock = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;

  .field {
    width: 80px;
    display: flex;
    justify-content: center;
  }
`

const RuleAgree = styled(Field)`
  font-size: 14px;
  line-height: 16px;
`

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
