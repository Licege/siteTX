import { useContacts, useRequestContacts } from '../../redux/hooks/contacts.hooks'

export const useSocialNetworksLogic = () => {
  const contacts = useContacts()

  if (!contacts) {
    useRequestContacts()
  }

  return contacts;
}