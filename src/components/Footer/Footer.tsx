import React from 'react'
import {contactsType} from "../../types/types";

type PropsType = {
    contacts: contactsType | null
}

const Footer: React.FC<PropsType>  = ( {contacts} ) => {
    console.log(contacts);
    return (
        <div>123</div>
    )
};

export default Footer;