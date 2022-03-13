export default function (values) {
  const errors = {}
  const requiredField = [
    'title',
    'titleEn',
  ]

  requiredField.forEach(field => {
    if (!values[field]) errors[field] = 'Заполните это поле'
  })

  return errors
}

