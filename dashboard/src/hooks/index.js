import { useState } from 'react'

export const useFileLogic = () => {
  const [file, setFile] = useState('')

  const uploadFile = file => setFile(file)

  const createFormDataWithFile = (data, fieldName) => {
    const formData = new FormData()

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key])
      }
    }

    if (data[fieldName] && !file) {
      formData.set(fieldName, data[fieldName])
    } else {
      formData.set(fieldName, file)
    }

    return formData
  }

  return { file, uploadFile, createFormDataWithFile }
}