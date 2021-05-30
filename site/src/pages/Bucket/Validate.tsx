export default function (values: any): any {
    const errors = {} as any
    const requiredFields = [
        'name',
        'phone',
        'ruleAgree',
    ]

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Заполните это поле'
        }
    })

    if (!values['ruleAgree']) {
        errors['ruleAgree'] = 'Для продолжения необходимо принять условия'
    }
    console.log(errors);
    return errors
}
