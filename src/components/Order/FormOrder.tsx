import React from 'react';
import {InjectedFormProps, reduxForm, Field} from "redux-form";
import renderTextField from "../common/elements/RenderTextField";
import {FormControl, FormHelperText, InputLabel, Button} from "@material-ui/core";
import Select from "@material-ui/core/Select/Select";
import validate from './Validate';
import {IOrder} from "../../types/types";
import MyReactDateTimePicker from "../common/elements/MyReactDateTimePicker";


const renderFromHelper = ({ touched, error }: any) => {
    if (!(touched && error)) {
        return
    } else {
        return <FormHelperText>{touched && error}</FormHelperText>
    }
}

const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }: any): any => (
    <FormControl error={touched && error}>
        <InputLabel htmlFor="count">{label}</InputLabel>
        <Select native {...input} {...custom} inputProps={{name: 'count', id: 'order-count-person'}}>
            {children}
        </Select>
        {renderFromHelper({ touched, error })}
    </FormControl>
)

const FormOrder: React.FC<InjectedFormProps> = ({ handleSubmit }) => {

    return (
        <form onSubmit={handleSubmit}>

            <div>
                <Field name='surname' component={renderTextField} label='Ваше имя:' placeholder='Введите имя:' />
            </div>
            <div>
                <Field name='phone' component={renderTextField} label='Контактный телефон' placeholder='Введите телефон' />
            </div>
            <div>
                <Field name='datetime' component={MyReactDateTimePicker} />
            </div>
            <div>
                <Field name='count' component={renderSelectField} label='Количество гостей'>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                </Field>
            </div>
            <div>
                <Field name='comment'
                       component={renderTextField}
                       label='Пожелания:'
                       multiline
                       rowsMax="6"
                       margin="normal" />
            </div>
            <div>
                <Button variant='contained' color='primary' type='submit'>Заказать</Button>
            </div>

        </form>
    )
};

let ReduxFormOrder = reduxForm<IOrder>({
    form: 'orderForm',
    initialValues: {
        datetime: new Date()
    },
    validate,
    enableReinitialize: true})(FormOrder);

export default ReduxFormOrder;