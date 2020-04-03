import React from 'react';
import {reduxForm, Field, InjectedFormProps, FormSection, formValueSelector} from 'redux-form';
import MyDateTimePicker from "../common/elements/MyDateTimePicker";
import {Button} from "react-bootstrap";
import {connect} from 'react-redux';
import {cityType, deliveryGlobalSettingsType, deliverySettingsType, IDeliveryPost} from "../../types/types";
import {getTitleById} from "../../plugins/helpers";


interface PropsType {
    cities: Array<cityType>
    settings: Array<deliverySettingsType>
    global_settings: deliveryGlobalSettingsType
    payment_method: string
    delivery_method: string

    choiceDate: (date: Date | null) => void
}

interface IMapStateToProps {
    form: string
    address: {
        city: number
    }
    enableReinitialize: boolean
}

const FormOrder: React.FC<InjectedFormProps<IDeliveryPost & IMapStateToProps> & PropsType> = (props ) => {
    const {handleSubmit, settings, global_settings, cities, payment_method, delivery_method, choiceDate} = props;
    let defaultDate = new Date(); defaultDate.setHours(defaultDate.getHours() + 2)

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Ваше имя:</label>
                <Field name='surname' type='text'  component='input' required />
            </div>
           <div>
               <label>Контактный телефон:</label>
               <Field name='phone' type='text' component='input' required />
           </div>
            <div>
                <label>E-mail:</label>
                <Field name='email' type='text' component='input' />
            </div>
            <div>
                <label>Выберите способ оплаты:</label>
                <div>
                    <label>
                        <Field name='payment_method' type='radio' component='input' value='cash' /> Наличными
                    </label>
                    {payment_method === 'cash' && <div>
                        <label>Сдача с:</label>
                        <Field name='odd_money' type='text' component='input' />
                    </div>}
                </div>
                <div>
                    <label>
                        <Field name='payment_method' type='radio' component='input' value='cashless_payment' /> Безналичный расчет курьеру
                    </label>
                </div>
                <div>
                    <label>
                        <Field name='payment_method' type='radio' component='input' value='cashless_payment_online' /> Безналичный расчет on-line
                    </label>
                </div>
            </div>
            <div>
                <label>Выберите способ доставки:</label>
                <div>
                    <label>
                        <Field name='delivery_type' type='radio' component='input' value='home' disabled={!global_settings.is_delivery_working} /> На дом
                    </label>
                </div>
                <div>
                    <label>
                        <Field name='delivery_type' type='radio' component='input' value='restaurant' /> Самовывоз из ресторана
                    </label>
                </div>
            </div>
            {delivery_method === 'home'
                ?
                <FormSection name='address'>
                    <div>
                        <label>Город:</label>
                        <Field name='city' component='select' required>
                            {settings.map(s => (
                                s.is_delivery && <option value={s.city_id} key={s.city_id}>{getTitleById(cities, s.city_id)}</option>
                            ))}
                        </Field>
                    </div>
                    <div>
                        <label>Улица:</label>
                        <Field name='street' type='text' component='input' required />
                    </div>
                    <div>
                        <label>Дом:</label>
                        <Field name='house' type='text' component='input' required />
                    </div>
                    <div>
                        <label>Квартира:</label>
                        <Field name='flat' type='text' component='input' />
                    </div>
                    <div>
                        <label>Домофон:</label>
                        <Field name='intercom' type='text' component='input' />
                    </div>
                    <div>
                        <label>Этаж:</label>
                        <Field name='floor' type='text' component='input' />
                    </div>
                </FormSection>
                :
                <div>
                    <label>Выберите адрес ресторана:</label>
                </div>
            }
            <div>
                <label>Время доставки:</label>
                <Field name='datetime' component={MyDateTimePicker} choiceDate={choiceDate} defautDate={defaultDate} />
            </div>
            <div>
                <label>Количество персон:</label>
                <Field name='count_person' type='text' component='input' />
            </div>
            <div>
                <label>Пожелания к заказу</label>
                <Field name='comment' type='text' component='textarea' />
            </div>
            <div>
                <label>
                    <Field name='rule_agree' type='checkbox' component='input' /> Я согласен на обработку своих персональных данных и принимаю условия Политики конфиденциальности и Пользовательского соглашения
                </label>
            </div>
            <Button variant='primary' type='submit'>Оформить заказ</Button>
        </form>
    )
};

let ReduxFormOrder = reduxForm<IDeliveryPost & IMapStateToProps, PropsType>({
    form: 'bucketOrderForm',
    initialValues: {
        payment_type: 'cash',
        delivery_type: 'home',
        address: {
            city: 1
        }
    },
    enableReinitialize: true
})(FormOrder);

const selector = formValueSelector('bucketOrderForm');
export default connect(
    state => {
        return selector(state, 'payment_type', 'delivery_type')
    }
)(ReduxFormOrder);