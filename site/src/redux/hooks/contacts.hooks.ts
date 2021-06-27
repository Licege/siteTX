import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../redux-store'
import { requestContacts } from '../thunks/contacts.thunk'
import { getContacts } from '../getters/contacts.getters'

export const useContacts = () => {
  const dispatch = useAppDispatch()
  const contacts = useSelector(getContacts)

  useEffect(() => {
    if (!contacts) dispatch(requestContacts())
  }, [dispatch])

  return contacts;
}

export const useRequestContacts = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(requestContacts())
  }, [dispatch])

  return useSelector(getContacts)
}
