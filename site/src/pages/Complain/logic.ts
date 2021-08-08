import { useEffect, useMemo } from 'react';
import { useAppDispatch } from '../../redux/redux-store'
import { useMe } from '../../redux/hooks/profile.hooks';
import { requestComplain, requestComplainTypes } from '../../redux/thunks/complain.thunk';
import { complainType } from '../../types/types';
import { getFullName, isNil } from '../../plugins/helpers';
import { useComplainTypes } from '../../redux/hooks/complain.hooks';


interface IInitialValues {
    typeId?: number
    name?: string
    phone?: string
    email?: string
}

export const useComplainFormLogic = () => {
  const dispatch = useAppDispatch()
  const me = useMe()
  const complainTypes = useComplainTypes()

  useEffect(() => {
    dispatch(requestComplainTypes())
  }, [dispatch])

  const types = complainTypes.map(type => ({ label: type.title, value: type.id }))

  const getInitialValues = (): IInitialValues => {
    const initialValues: IInitialValues = {}

    if (types.length) initialValues.typeId = types[0].value

    if (!isNil(me)) {
      const { surname, forename, patronymic, phone, email } = me

      initialValues.name = getFullName({ surname, forename, patronymic })
      initialValues.phone = phone
      initialValues.email = email
    }

    return initialValues
  }

  const onSubmit = (complain: complainType) => {
    dispatch(requestComplain(complain));
  }

  const initialValues: IInitialValues = useMemo(getInitialValues, [me, types]);

  return { initialValues, types, onSubmit }
}