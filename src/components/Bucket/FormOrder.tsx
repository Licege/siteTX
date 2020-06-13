import React from 'react';
import {reduxForm, Field, InjectedFormProps, FormSection, formValueSelector} from 'redux-form';
import {connect} from 'react-redux';
import {deliveryGlobalSettingsType, deliverySettingsType, deliveryType, IDeliveryPost} from "../../types/types";
import renderTextField from "../common/elements/RenderTextField";
import validate from './Validate';
import {
    FormControl,
    FormHelperText,
    InputLabel,
    RadioGroup,
    Radio,
    Button,
    Theme,
    createStyles
} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import renderCheckbox from "../common/elements/RenderCheckbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DateTimeField from "../common/elements/MaterialDateTimePicker";
import {makeStyles} from "@material-ui/core/styles";


interface PropsType {
    settings: Array<deliverySettingsType>
    global_settings: deliveryGlobalSettingsType
    payment_method: string
    delivery_method: string
    price: number
    orderPrice: number
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
    time_delivery: Date
    enableReinitialize: boolean
}

const renderFromHelper = ({touched, error}: any) => {
    if (!(touched && error)) {
        return
    } else {
        return <FormHelperText>{touched && error}</FormHelperText>
    }
}

const renderSelectField = ({input, label, meta: {touched, error}, children, ...custom}: any): any => (
    <FormControl error={touched && error}>
        <InputLabel htmlFor="city">Город</InputLabel>
        <Select native {...input} {...custom} inputProps={{name: 'city', id: 'city-bucket'}}>
            {children}
        </Select>
        {renderFromHelper({touched, error})}
    </FormControl>
)

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
                width: '220px',
            },
        },
    }),
);


const FormOrder: React.FC<InjectedFormProps<IDeliveryPost & IMapStateToProps> & PropsType> = (props) => {
    const {handleSubmit, settings, global_settings, payment_method, delivery_method, saleForPickup, delivery, deliveryPrice, orderPrice} = props;
    let defaultDate = new Date();
    defaultDate.setHours(defaultDate.getHours() + 2)
    const classes = useStyles()

    const sale = (delivery.total_price + deliveryPrice) * saleForPickup / 100
    const price = delivery.total_price + deliveryPrice - sale

    return (
        <div className='bucket-order'>
            {/*<h3 className='bucket-order-title'>Оформление заказа</h3>*/}
            <form onSubmit={handleSubmit} className={classes.root}>
                <div>
                    <Field name='surname' component={renderTextField} label='Ваше имя:' placeholder='Введите имя'/>
                </div>
                <div>
                    <Field name='phone' component={renderTextField} label='Контактный телефон'
                           placeholder='Введите телефон'/>
                </div>
                <div>
                    <Field name='email' component={renderTextField} label='E-mail' placeholder='Введите e-mail'/>
                </div>
                <div>
                    <div>
                        <label>Выберите способ оплаты:</label>
                    </div>
                    <Field name='payment_type' component={radioButton}>
                        {global_settings.payment_type_cash &&
                        <FormControlLabel value='cash' control={<Radio/>} label='Наличными'/>}
                        {global_settings.payment_type_cashless &&
                        <FormControlLabel value='cashless_payment' control={<Radio/>}
                                          label='Безналичный расчет курьеру'/>}
                        {global_settings.payment_type_online &&
                        <FormControlLabel value='cashless_payment_online' control={<Radio/>}
                                          label='Безналичный расчет'/>}
                    </Field>
                    {payment_method === 'cash' && <div className='bucket-order__cash'>
                        Подготовить сдачу с
                            <Field name='odd_money' component={renderTextField} label='' placeholder='0'/> рублей
                    </div>}
                </div>
                <div>
                    <div>
                        <label>Выберите способ доставки:</label>
                    </div>
                    <Field name='delivery_type' component={radioButton}>
                        {global_settings.is_delivery_working &&
                        <FormControlLabel value='home' control={<Radio/>} label='На дом'/>}
                        <FormControlLabel value='restaurant' control={<Radio/>} label='Самовывоз из ресторана'/>
                    </Field>
                </div>
                {delivery_method === 'home'
                    ?
                    <FormSection name='address'>
                        <div>
                            <Field name='city' component={renderSelectField} label='Город'>
                                {settings.map(s => (
                                    s.is_delivery && <option value={s.city} key={s._id}>{s.city}</option>
                                ))}
                            </Field>
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
                    <Field name='time_delivery' component={DateTimeField}/>
                </div>
                <div>
                    <Field name='count_person'
                           parse={(value: string) => value !== '' ? Number(value) : ''}
                           type='number'
                           component={renderTextField}
                           label='Количество персон'
                           placeholder='Количество персон'/>
                </div>
                <div>
                    <Field name='comment'
                           component={renderTextField}
                           label='Пожелания к заказу'
                           placeholder='Опишите ваши пожелания'
                           multiline
                           rowsMax="6"
                           margin="normal"/>
                </div>
                <div>
                    <Field name='rule_agree'
                           component={renderCheckbox}
                           label='Я согласен на обработку своих персональных данных и принимаю условия Политики конфиденциальности и Пользовательского соглашения'/>
                </div>

                {!!delivery.order.length && <div>
                    <div>Сумма заказа: {delivery.total_price} ₽</div>
                    <div>
                        {
                            saleForPickup === 0
                                ? `Стоимость доставки: ${deliveryPrice} ₽`
                                : `Скидка за самовывоз: ${sale} ₽ (${saleForPickup})%`
                        }
                    </div>
                    <div>Итого: {price} ₽</div>
                </div>}

                <Button variant='contained' color='primary' type='submit'>Оформить заказ ({price} р.)</Button>
            </form>
        </div>
    )
};

let ReduxFormOrder = reduxForm<IDeliveryPost & IMapStateToProps, PropsType>({
    form: 'bucketOrderForm',
    initialValues: {
        payment_type: 'cash',
        delivery_type: 'home',
        address: {
            city: 'Калининград'
        },
        time_delivery: new Date(new Date().setMilliseconds(60 * 60 * 1000))
    },
    validate,
    enableReinitialize: true
})(FormOrder);

const selector = formValueSelector('bucketOrderForm');
export default connect(
    state => {
        return selector(state, 'payment_type', 'delivery_type')
    }
)(ReduxFormOrder);