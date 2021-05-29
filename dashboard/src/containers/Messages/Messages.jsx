import React from 'react'
import { deleteMessage, requestMessages } from '../../redux/message-reducer'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Messages from '../../pages/Messages/Messages'

class MessagesContainer extends React.Component {
    componentDidMount() {
        if (!this.props.messages.length) this.props.getMessages()
    }

    render() {
        return <Messages messages={this.props.messages} deleteMessage={this.props.deleteMessage}/>
    }
}

let mapStateToProps = ( state ) => {
    return {
        messages: state.messagesPage.messages,
    }
}

let mapDispatchToProps = ( dispatch ) => {
    return {
        getMessages: () => {
            dispatch(requestMessages())
        },
        deleteMessage: ( id ) => {
            dispatch(deleteMessage(id))
        },
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(MessagesContainer)
