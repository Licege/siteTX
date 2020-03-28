import React from 'react';
import {contactsType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {compose} from 'redux';
import Contacts from "../../components/Contacts/Contacts";

type PropsType = {
    contacts: contactsType | null
}

class ContactsContainer extends React.Component<PropsType> {
    render() {
        return <Contacts contacts={this.props.contacts}/>
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        contacts: state.contacts.contacts
    }
};

export default compose(connect(mapStateToProps, {})) (ContactsContainer)