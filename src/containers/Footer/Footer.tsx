import React from 'react';
import Footer from "../../components/Footer/Footer";
import {connect} from "react-redux";
import {contactsType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";
import {getContacts} from "../../redux/contacts-reducer";


type MapStatePropsType = {
    contacts: contactsType
}
type MapDispatchPropsType = {
    getContacts: () => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

class FooterContainer extends React.Component<PropsType> {
    componentDidMount() {
        if (!this.props.contacts) {
            this.props.getContacts();
        }
    }

    render() {
        return <Footer contacts={this.props.contacts} />;
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
            dispatch(getContacts());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (FooterContainer);