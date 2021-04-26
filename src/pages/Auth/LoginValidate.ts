export default function (values: any): any {
    const errors = {} as any
    const requiredFields = [
        'email',
        'password',
    ]

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Заполните это поле'
        }
    })

    return errors
}
