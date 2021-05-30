import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getComplainTypeSelector } from '../../redux/selectors/complain'
import { requestComplain, requestComplainTypes } from '../../redux/thunks/complain.thunk'
import ComplainForm from './ComplainForm'

import { getMeSelector } from '../../redux/selectors/profile';
import { getFullName, isNil } from '../../plugins/helpers'
import { complainType } from '../../types/types';
import styled from 'styled-components'

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

    const preparedComplainTypes = complainTypes.map(type => ({ label: type.title, value: type.id }))

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
        <Container>
            <ComplainForm initialValues={initialValues} types={preparedComplainTypes} onSubmit={onSubmit} />
        </Container>
    )
}

const Container = styled.main`
    padding: 24px;
`

export default Complain