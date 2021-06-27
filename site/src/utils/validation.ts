export function isCorrectEmail(value: string) {
  const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  return emailPattern.test(value)
}

export function isStrongPassword(value: string) {
  // должен состоять из 8-12 символов, включая одну заглавную букву, одну строчную букву, одну цифру и один специальный символ

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&-_])[A-Za-z\d@$!%*#?&]{8,12}$/
  return passwordPattern.test(value)
}

export function isCorrectPhoneNumber(value: string) {
  const phoneNumberPattern = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/
  return phoneNumberPattern.test(value)
}