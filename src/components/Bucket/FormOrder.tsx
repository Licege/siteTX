import React from 'react'
import { Field, FormSection, formValueSelector, InjectedFormProps, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { deliveryGlobalSettingsType, deliverySettingsType, deliveryType, IDeliveryPost } from '../../types/types'
import renderTextField from '../common/elements/form/RenderTextField'
import validate from './Validate'
import {
    Button,
    createStyles,
    FormControl,
    FormHelperText,
    InputLabel,
    Radio,
    RadioGroup,
    Theme,
} from '@material-ui/core'
import Select from '../common/elements/form/RenderSelect'
// import Select from '@material-ui/core/Select'
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

// const renderFromHelper = ({ touched, error }: any) => {
//     if (!(touched && error)) {
//         return
//     } else {
//         return <FormHelperText>{touched && error}</FormHelperText>
//     }
// }

// const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }: any): any => (
//     <FormControl error={touched && error}>
//         <InputLabel htmlFor="city">Город</InputLabel>
//         <Select native {...input} {...custom} inputProps={{ name: 'city', id: 'city-bucket' }}>
//             {children}
//         </Select>
//         {renderFromHelper({ touched, error })}
//     </FormControl>
// )

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

type FormType = InjectedFormProps<IMapStateToProps & IDeliveryPost, PropsType> & PropsType

const FormOrder: React.FC<FormType> = (props) => {
    const { handleSubmit, settings, globalSettings, paymentMethod, deliveryMethod, saleForPickup, delivery, deliveryPrice } = props
    let defaultDate = new Date()
    defaultDate.setHours(defaultDate.getHours() + 2)
    const classes = useStyles()

    const sale = (delivery.totalPrice + deliveryPrice) * saleForPickup / 100
    const price = delivery.totalPrice + deliveryPrice - sale

    const cityOptions = settings.reduce((acc: any, s) => {
        return s.isDelivery ? [...acc, { value: s.id, label: s.city }] : acc
    }, [])

    return (
        <div className='bucket-order'>
            <form onSubmit={handleSubmit} className={classes.root}>
                <div>
                    <Field name='name'
                           component={renderTextField}
                           label='Ваше имя:'
                           placeholder='Введите имя' />
                </div>
                <div>
                    <Field name='phone'
                           component={renderTextField}
                           label='Контактный телефон'
                           placeholder='Введите телефон' />
                </div>
                <div>
                    <Field name='email'
                           component={renderTextField}
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
                        <Field name='oddMoney' component={renderTextField} label='' placeholder='0'/> рублей
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
                    <FormSection name='address'>
                        {/*<div>*/}
                        {/*    <Field name='city' component={renderSelectField} label='Город'>*/}
                        {/*        {settings.map(s => (*/}
                        {/*            s.isDelivery && <option value={s.city} key={s.id}>{s.city}</option>*/}
                        {/*        ))}*/}
                        {/*    </Field>*/}
                        {/*</div>*/}
                        <div>
                            <Field name='city' component={Select} label='Город' options={cityOptions} />
                        </div>
                        <div>
                            <Field name='street' component={renderTextField} label='Улица'
                                   placeholder='Введите название улицы'/>
                        </div>
                        <div>
                            <Field name='house' component={renderTextField} label='Дом'
                                   placeholder='Введите номер дома'/>
                        </div>
                        <div>
                            <Field name='flat' component={renderTextField} label='Квартира'
                                   placeholder='Введите номер'/>
                        </div>
                        <div>
                            <Field name='intercom' component={renderTextField} label='Домофон'
                                   placeholder='Введите код'/>
                        </div>
                        <div>
                            <Field name='floor' component={renderTextField} label='Этаж' placeholder='Этаж'/>
                        </div>
                    </FormSection>
                    :
                    <div>
                        <label>Выберите адрес ресторана:</label>
                    </div>
                }
                <div>
                    <Field name='timeDelivery' component={DateTimeField}/>
                </div>
                <div>
                    <Field name='countPerson'
                           parse={(value: string) => value !== '' ? Number(value) : ''}
                           normalize={(value: number) => rangeNumbers(value, 0, 20)}
                           type='number'
                           component={renderTextField}
                           label='Количество персон'
                           placeholder='Количество персон'/>
                </div>
                <div>
                    <Field name='comment'
                           component={renderTextField}
                           as='textarea'
                           label='Пожелания к заказу'
                           placeholder='Опишите ваши пожелания' rows={6} />
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

let ReduxFormOrder = reduxForm<IDeliveryPost & IMapStateToProps, PropsType>({
    form: 'bucketOrderForm',
    validate,
    onSubmitFail: (errors => scrollToFirstError(errors)),
    enableReinitialize: true,
})(FormOrder)

const selector = formValueSelector('bucketOrderForm')
export default connect(
    state => {
        return selector(state, 'paymentType', 'deliveryType')
    },
)(ReduxFormOrder)
