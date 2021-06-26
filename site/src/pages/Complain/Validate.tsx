import { isCorrectEmail, isCorrectPhoneNumber } from '../../utils/validation'

const REQUIRED_FIELDS = [
    'name',
    'phone',
    'email',
]

export default function (values: any): any {
    const errors = {} as any

    REQUIRED_FIELDS.forEach(fieldKey => {
        const fieldValue = values[fieldKey]

        if (!fieldValue) {
            return errors[fieldKey] = 'Заполните это поле'
        }
        validateFieldValue(errors, fieldKey, fieldValue)
    })

    return errors
}

const validateFieldValue = (errors: any, fieldKey: string, value: string) => {
    switch (fieldKey) {
        case 'phone':
            if (!isCorrectPhoneNumber(value)) errors[fieldKey] = 'Введите корректный номер'
            break;
        case 'email':
            if (!isCorrectEmail(value)) errors[fieldKey] = 'Введите корректный email'
            break;
        default:
            return;
    }
}
