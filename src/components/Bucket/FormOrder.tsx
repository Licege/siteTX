import React from 'react'
import { Field } from 'react-final-form'
import { connect } from 'react-redux'
import { deliveryGlobalSettingsType, deliverySettingsType, deliveryType, IDeliveryPost } from '../../types/types'
import TextField from '../common/elements/form/RenderTextField'
import Datepicker from '../common/elements/form/RenderDatepicker'
import validate from './Validate'
import {
    Button,
    createStyles,
    FormControl,
    Radio,
    RadioGroup,
    Theme,
} from '@material-ui/core'
import Select from '../common/elements/form/RenderSelect'
import renderCheckbox from '../common/elements/form/RenderCheckbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import DateTimeField from '../common/elements/MaterialDateTimePicker'
import { makeStyles } from '@material-ui/core/styles'
import { scrollToFirstError } from '../../plugins/validate'
import { rangeNumbers } from '../../plugins/helpers'


interface PropsType {
    settings: Array<deliverySettingsType>
    globalSettings: deliveryGlobalSettingsType
    paymentMethod: string
    deliveryMethod: string
    price: number
    delivery: deliveryType
    deliveryPrice: number
    saleForPickup: number
    sale: number
}

interface IMapStateToProps {
    form: string
    address: {
        city: string
    }
    timeDelivery: Date
    enableReinitialize: boolean
}

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

const FormOrder: React.FC<any> = ({ handleSubmit, settings, globalSettings, paymentMethod, deliveryMethod, saleForPickup, delivery, deliveryPrice }: any) => {
    const classes = useStyles()

    const sale = (delivery.totalPrice + deliveryPrice) * saleForPickup / 100
    const price = delivery.totalPrice + deliveryPrice - sale

    const cityOptions = settings.reduce((acc: any, s: any) => {
        return s.isDelivery ? [...acc, { value: s.id, label: s.city }] : acc
    }, [])

    return (
        <div className='bucket-order'>
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
                    {paymentMethod === 'cash' && <div className='bucket-order__cash'>
                        Подготовить сдачу с
                        <Field name='oddMoney' component={TextField} label='' placeholder='0'/> рублей
                    </div>}
                </div>
                <div>
                    <div>
                        <label>Выберите способ доставки:</label>
                    </div>
                    <Field name='deliveryType' component={radioButton}>
                        {globalSettings.isDeliveryWorking &&
                        <FormControlLabel value='home' control={<Radio/>} label='На дом'/>}
                        <FormControlLabel value='restaurant' control={<Radio/>} label='Самовывоз из ресторана'/>
                    </Field>
                </div>
                {deliveryMethod === 'home'
                    ?
                    <Field name='address'>
                        <div>
                            <Field name='city' component={Select} label='Город' options={cityOptions} defaultValue={cityOptions[0]} />
                        </div>
                        <div>
                            <Field name='street' component={TextField} label='Улица'
                                   placeholder='Введите название улицы'/>
                        </div>
                        <div>
                            <Field name='house' component={TextField} label='Дом'
                                   placeholder='Введите номер дома'/>
                        </div>
                        <div>
                            <Field name='flat' component={TextField} label='Квартира'
                                   placeholder='Введите номер'/>
                        </div>
                        <div>
                            <Field name='intercom' component={TextField} label='Домофон'
                                   placeholder='Введите код'/>
                        </div>
                        <div>
                            <Field name='floor' component={TextField} label='Этаж' placeholder='Этаж'/>
                        </div>
                    </Field>
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
                           component={renderCheckbox}
                           label='Я согласен на обработку своих персональных данных и принимаю условия Политики конфиденциальности и Пользовательского соглашения'/>
                </div>

                {delivery.order.length && <div className='bucket-order__total'>
                    <div>Сумма заказа: {delivery.totalPrice} ₽</div>
                    <div>
                        {
                            saleForPickup === 0
                                ? `Стоимость доставки: ${deliveryPrice} ₽`
                                : `Скидка за самовывоз: ${sale} ₽ (${saleForPickup})%`
                        }
                    </div>
                    <div>Итого: {price} ₽</div>
                </div>}

                <div className='bucket-order__button'>
                    <Button variant='contained' color='primary' type='submit'>
                        Оформить заказ ({price} р.)
                    </Button>
                </div>
            </form>
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
