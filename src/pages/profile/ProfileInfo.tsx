import React from 'react'
import { addressType, profileType } from '../../types/types';
import format from "date-fns/format";
import { ru } from "date-fns/locale";
import { Avatar } from '../../components/common/elements/avatar/avatar';

interface IProps {
    profile: profileType
}

const getAge = (birthday: Date | string) => {
    const birthDate = new Date(birthday)
    const now = new Date()
    const age = now.getFullYear() - birthDate.getFullYear()

    return now.setFullYear(1972) < birthDate.setFullYear(1972) ? age - 1 : age
}

interface IField {
    title: string,
    value: string | undefined
}

const Field = ({ title, value }: IField) => (
    <div>
        {title} {value ? <span style={{ fontWeight: 600 }}>{value}</span> : 'Не задано'}
    </div>
)

const Info = ({ profile }: IProps) => {
    const {
        surname,
        forename,
        patronymic,
        phone,
        email,
        address,
    } = profile

    const birthday = profile.birthday
        ? format(new Date(profile.birthday), 'dd MMMM yyyy', { locale: ru })
        : undefined
    const age = profile.birthday
        ? getAge(profile.birthday).toString()
        : undefined
    const fullAddress = getAddress(address)

    const fields = [
        {
            title: '',
            value: `${surname}${forename ? ' ' + forename : ''}${patronymic ? ' ' + patronymic  : ''}${age ? ', ' + age : ''}`
        },
        {
            title: 'Дата рождения:',
            value: birthday,
        },
        {
            title: 'Телефон:',
            value: phone,
        },
        {
            title: 'E-mail:',
            value: email
        },
        {
            title: 'Адрес:',
            value: fullAddress,
        }
    ]

    return (
        <div>
            {fields.map((field, key) => <Field key={key} {...field} />)}
        </div>
    )
}

const getAddress = (address: addressType | undefined): string => {
    const {
        city,
        street,
        house,
        flat,
        intercom,
        floor,
    } = address || {}

    let result = ''

    if (!address || !Object.keys(address).length) return ''

    if (city) result += `г. ${city}`
    if (street) result += `, ул. ${street}`
    if (house) result += `, д. ${house}`
    if (floor) result += `, ${floor} этаж`
    if (flat) result += `, кв. ${flat}`
    if (intercom) result += `, домофон: ${intercom}`

    return result
}

export const ProfileInfo = ({ profile }: IProps) => {
    const { avatar } = profile

    return (
        <div className='profile-info'>
            <Avatar avatarSrc={avatar} />
            <Info profile={profile} />
        </div>
    )
}