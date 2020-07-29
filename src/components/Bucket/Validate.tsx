export default function (values: any): any {
    const errors = {} as any
    const requiredFields = [
        'surname',
        'phone',
        'rule_agree',
    ]

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Заполните это поле'
        }
    })

    if (!values['rule_agree']) {
        errors['rule_agree'] = 'Для продолжения необходимо принять условия'
    }
    return errors
}
