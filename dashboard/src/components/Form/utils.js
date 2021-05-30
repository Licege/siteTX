export const prepareOptions = (array, { value = 'id', name = 'name' }) => {
  return array.map(item => ({ value: item[value], name: item[name] }))
}