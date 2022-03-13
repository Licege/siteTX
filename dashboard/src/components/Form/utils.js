export const prepareOptions = (array = [], {value = 'id', name = 'name', withEmpty = true}) => {
  const options = array.map(item => ({value: item[value], label: item[name]}))

  if (withEmpty) {
    options.unshift({value: '', label: 'Не выбрано'})
  }

  return options
}


// Функция возвращающая нужный формат для React-Select в React-Final-Form
export const toSelectValue = (options, value, {keyValue = 'id', keyLabel = 'name'} = {}) => {
  const chosenOption = options.find(option => option[keyValue] === value);

  if (!chosenOption) return {value: '', label: 'Не выбрано'};

  return {
    value,
    label: chosenOption[keyLabel]
  }
}