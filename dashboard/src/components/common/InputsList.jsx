import React, { useState, useEffect } from 'react'


const helpers = {
  pushEmptyInput: array => [...array, ''],
  removeInput: (array, key) => array.filter((_, idx) => key !== idx),
  changeHoursByKey: (array, newValue, key) => array.map((value, idx) => idx === key ? newValue : value),
  last: array => array[array.length - 1]
}

const InputsList = ({ items = [], onChange, placeholder }) => {
  const [innerItems, setInnerItems] = useState(items)

  useEffect(() => {
    setInnerItems(items)
  }, [items])

  useEffect(() => {
    onChange(innerItems)
  }, [innerItems])

  const handleInputField = key => ({ target: { value } }) => {
    const { pushEmptyInput, removeInput, changeHoursByKey, last } = helpers;
    let listHours = [...innerItems]
    if (value === '') {
      listHours = removeInput(listHours, key)
    } else {
      listHours = changeHoursByKey(listHours, value, key)
    }
    if (last(listHours) !== '') {
      listHours = pushEmptyInput(listHours)
    }
    setInnerItems(listHours)
  }

  return (
    innerItems.map((item, key) => <input value={item}
                                                 onChange={handleInputField(key)}
                                                 key={key}
                                                 placeholder={!item ? placeholder : ''}
                                                 className="filter-main-input -name form-control"
    />)
  )
}

export default InputsList