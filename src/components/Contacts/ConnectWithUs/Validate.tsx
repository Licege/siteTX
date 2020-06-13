export default function (values: any): any {
    const error = {} as any
    const requiredFields = [
        'name',
        'phone',
        'comment'
    ]

    requiredFields.forEach(field => {
        if (!values[field]) {
            error[field] = 'Заполните это поле'
        }
    })

    return error
}