import React from 'react';
import {contactsType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";
import {getContacts} from "../../redux/contacts-reducer";
import {compose} from "redux";
import {connect} from 'react-redux';
import Header from "./Header";

type MapStatePropsType = {
    contacts: contactsType | null
}
type MapDispatchPropsType = {
    getContacts: () => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

class HeaderContainer extends React.Component<PropsType> {
    componentDidMount(): void {
        if (!this.props.contacts) {
            this.props.getContacts();
        }
    }

    render() {
        return <Header contacts={this.props.contacts} />
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        contacts: state.contacts.contacts
    }
};

let mapDispatchToProps = (dispatch: any) => {
    return {
        getContacts: () => {
            dispatch(getContacts())
        }
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps)) (HeaderContainer);
