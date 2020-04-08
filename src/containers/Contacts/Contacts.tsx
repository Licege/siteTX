import React from 'react';
import {contactsType, reviewType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {compose} from 'redux';
import Contacts from "../../components/Contacts/Contacts";
import {getContacts} from "../../redux/contacts-reducer";

type PropsType = {
    contacts: contactsType | null
    getContacts: () => void
}

class ContactsContainer extends React.Component<PropsType> {
    componentDidMount(): void {
        if (!this.props.contacts) this.props.getContacts();
    }

    postForm = (data: reviewType) => {
        data.create_at = Date.parse(new Date().toString())
        console.log(data)
    }

    render() {
        return <Contacts contacts={this.props.contacts} postForm={this.postForm} />
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        contacts: state.contacts.contacts
    }
}

let mapDispatchToProps = (dispatch: any) => {
    return {
        getContacts: () => {
            dispatch(getContacts())
        }
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps)) (ContactsContainer)