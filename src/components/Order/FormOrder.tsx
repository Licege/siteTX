import React from 'react';
import {InjectedFormProps, reduxForm, Field} from "redux-form";
import renderTextField from "../common/elements/RenderTextField";
import {FormControl, FormHelperText, InputLabel, Button} from "@material-ui/core";
import Select from "@material-ui/core/Select/Select";
import validate from './Validate';
import {IOrder} from "../../types/types";
import DateTimeField from "../common/elements/MaterialDateTimePicker";


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
                <Field name='name' component={renderTextField} label='Ваше имя:' placeholder='Введите имя:' />
            </div>
            <div>
                <Field name='phone' component={renderTextField} label='Контактный телефон' placeholder='Введите телефон' />
            </div>
            <div>
                {/*<Field name='datetime' component={MyReactDateTimePicker} parse={(value: Date) => value.toISOString()} />*/}
                <Field name='order_date' component={DateTimeField} />
            </div>
            <div>
                <Field name='count_person' component={renderSelectField} label='Количество гостей'>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                </Field>
            </div>
            <div>
                <Field name='comment'
                       component={renderTextField}
                       label='Пожелания:'
                       multiline
                       rowsMax='6'
                       margin='normal' />
            </div>
            <div>
                <Button variant='contained' color='primary' type='submit'>Забронировать стол</Button>
            </div>
        </form>
    )
};

let ReduxFormOrder = reduxForm<IOrder>({
    form: 'orderForm',
    initialValues: {
        order_date: new Date(new Date().setMilliseconds(2 * 60 * 60 * 1000))
    },
    validate,
    enableReinitialize: true})(FormOrder);

export default ReduxFormOrder;