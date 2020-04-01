import React from 'react';
import {InjectedFormProps, reduxForm, Field} from "redux-form";

interface IMapStateToProps {

}

interface IProps {

}

const FormOrder: React.FC<InjectedFormProps<IMapStateToProps> & IProps> = ( props ) => {
    const {handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Ваше имя:</label>
                <Field name='surname' component='input' />
            </div>
            <div>
                <label>Телефон:</label>
                <Field name='phone' component='input' />
            </div>
            <div>
                <label>Выберите дату и время:</label>
                <Field name='datetime' component='input' />
            </div>
            <div>
                <label>Количество гостей:</label>
                <Field name='count' component='select'>
                    <option value={1}>1</option>
                </Field>
            </div>
            <div>
                <label>Пожелания:</label>
                <Field name='comment' component='textarea' />
            </div>
        </form>
    )
};

let ReduxFormOrder = reduxForm({form: 'orderForm', enableReinitialize: true})(FormOrder);

export default ReduxFormOrder;