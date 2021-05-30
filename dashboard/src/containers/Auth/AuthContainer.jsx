import React from 'react'
import Auth from '../../pages/Auth/Auth'
import { login } from '../../redux/thunks/auth.thunks'
import { connect } from 'react-redux'

class AuthContainer extends React.Component {
    componentDidUpdate( prevProps, prevState, snapshot ) {
        if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
            window.location.reload()
        }
    }

    postData = ( data ) => {
        this.props.login(data)
    }

    render() {
        return (
            <Auth onSubmit={this.postData}/>
        )
    }
}

let mapStateToProps = ( state ) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

let mapDispatchToProps = ( dispatch ) => {
    return {
        login: ( data ) => {
            dispatch(login(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer)
