import React from 'react'
import { contactsType } from '../../types/types'
import CustomMap from '../../components/common/Map/Map'

interface IProps {
    contacts: contactsType
}

export const Address: React.FC<IProps> = ( {contacts} ) => (
    <div>
        <h3>Мы на карте</h3>
        {contacts ?
            <>
                {contacts.address && <p>{contacts.address}</p>}
                {contacts.phone && <p><a href={'tel:' + contacts.phone}>{contacts.phone}</a></p>}
                {contacts.openHours?.map(( item, key ) => <div key={key}>{item}</div>)}
            </> : null}
        <CustomMap/>
    </div>
)
