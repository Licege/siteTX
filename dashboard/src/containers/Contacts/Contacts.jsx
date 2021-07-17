import React from 'react'
import Contacts from '../../pages/Contacts/Contacts'
import { fetchContacts, updateContacts } from '../../redux/thunks/contacts.thunks'
import { connect } from 'react-redux'

class ContactsContainer extends React.Component {
    constructor( props ) {
        super(props)

        this.state = { openHours: [ '' ] }
    }

    componentDidMount() {
        if (!Object.keys(this.props.contacts).length) this.props.getContacts()
        else this.setState({ openHours: [ ...this.props.contacts.openHours, '' ] })
    }

    componentDidUpdate( prevProps, prevState, snapshot ) {
        if (!Object.keys(prevProps.contacts).length && Object.keys(this.props.contacts).length) {
            this.setState({ openHours: [ ...this.props.contacts.openHours, '' ] })
            console.log('re')
        }
    }

    updateContacts = ( contacts ) => {
        let openHours = [ ...this.state.openHours ]
        let data = { ...contacts }
        data.openHours = [ ...openHours.slice(0, openHours.length - 1) ]
        this.props.updateContacts(data)
    }

    handlerInputField = ( idx ) => {
        return ( e ) => {
            let data = [ ...this.state.openHours ]
            data[idx] = e.target.value
            this.setState({ openHours: data })
            let lastIdx = this.state.openHours.length - 1
            if (data[idx] === '') {
                this.setState({ openHours: [ ...data.slice(0, data.length - 1) ] })
            }
            if (data[lastIdx] !== '') this.setState({ openHours: [ ...data, '' ] })
        }
    }

    cancel = () => {
        console.log('Скинуть изменения')
    }

    render() {
        return (
            <Contacts initialValues={this.props.contacts}
                      contacts={this.props.contacts}
                      onSubmit={this.updateContacts}
                      openHours={this.state.openHours}
                      handlerInputField={this.handlerInputField}
                      cancel={this.cancel}/>
        )
    }
}

let mapStateToProps = ( state ) => {
    return {
        contacts: state.contactsPage.contacts,
    }
}
let mapDispatchToProps = ( dispatch ) => {
    return {
        getContacts: () => {
            dispatch(fetchContacts())
        },
        updateContacts: ( contacts ) => {
            dispatch(updateContacts(contacts))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsContainer)
