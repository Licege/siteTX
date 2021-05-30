import {useState, useEffect, useCallback} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {fetchContacts, updateContacts as updateContactsThunk} from '../../redux/thunks/contats.thunks'
import {getContacts} from '../../redux/getters/contacts.getters'

const useContacts = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchContacts())
  }, [])

  return useSelector(getContacts)
}

export const useContactLogic = () => {
  const dispatch = useDispatch()

  const contacts = useContacts()
  const [openHours, setOpenHours] = useState([''])

  useEffect(() => {
    setOpenHours([...contacts.openHours, ''])
  }, [contacts])

  const updateContacts = useCallback(contacts => dispatch(updateContactsThunk(contacts)), [contacts])
  const cancel = useCallback(() => console.log('Отмена не готова'), [])

  const handleInputField = useCallback(list => setOpenHours(list), [])

  return {
    contacts,
    openHours,
    updateContacts,
    handleInputField,
    cancel
  }
}