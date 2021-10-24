export function getFullName({ lastName = '', firstName = '', middleName = '' }) {
  return `${lastName || ''} ${firstName || ''} ${middleName || ''}`.trim();
}

export function currencyFormat(value = 0, { withoutSign = false } = {}) {
  const options = withoutSign ? {} : { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 };
  return Intl.NumberFormat('ru-RU', options).format(+value)
}