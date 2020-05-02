export default function(values: any): any {
    const errors = {} as any
    const requiredFields = [
        'forename',
        'phone',
        'email',
        'password',
        'confirmPassword'
    ]

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Заполните это поле'
        }
        if (values['password'] && values['confirmPassword'] && values['password'] !== values['currentPassword'] ) {
            errors[field] = 'Пароли не совпадают'
        }
    })

    return errors
}