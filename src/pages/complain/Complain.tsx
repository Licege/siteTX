import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getComplainTypeSelector } from '../../redux/selectors/complain'
import { requestComplain, requestComplainTypes } from '../../redux/thunks/complain.thunk'
import ComplainForm from './ComplainForm'

import './style.scss'
import { getMeSelector } from '../../redux/selectors/profile';
import { getFullName, isNil } from '../../plugins/helpers'
import { complainType } from '../../types/types';

interface IInitialValues {
    name?: string
    phone?: string
    email?: string
}

const Complain = () => {
    const me = useSelector(getMeSelector)
    const complainTypes = useSelector(getComplainTypeSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        document.title = 'Ваше мнение'
        dispatch(requestComplainTypes())
    }, [])

    if (!complainTypes.length) return null

    const onSubmit = (complain: complainType) => {
        dispatch(requestComplain(complain));
    }

    const initialValues: IInitialValues = {}

    if (!isNil(me)) {
        const { surname, forename, patronymic, phone, email } = me

        initialValues.name = getFullName({ surname, forename, patronymic })
        initialValues.phone = phone
        initialValues.email = email
    }

    return (
        <div className='complain'>
            <ComplainForm initialValues={initialValues} types={complainTypes} onSubmit={onSubmit} />
        </div>
    )
}

export default Complain