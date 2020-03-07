import React from 'react';
import {contactsType} from "../../types/types";

type PropsType = {
    contacts: contactsType | null
}

const Contacts: React.FC<PropsType> = ({contacts} ) => {
    return (
        <div>
            123
        </div>
    )
};

export default Contacts;