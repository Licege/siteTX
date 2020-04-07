const Validate = (values: any) => {
    const errors = {} as any
    const requiredFields = [
        'surname',
        'phone',
        'datetime'
    ]

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Заполните это поле'
        }
    })

    return errors
}

export default Validate;