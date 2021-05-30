import React from 'react'
import { logout } from '../../../redux/reducers/auth.reducer'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'


class LogoutBtn extends React.Component {
    exit = () => {
        this.props.logout()
        // window.location.reload()
    }

    render() {
        return (
            <Button variant='outline-secondary' onClick={this.exit}>Выйти</Button>
        )
    }
}

let mapStateToProps = ( state ) => {
    return {}
}

let mapDispatchToProps = ( dispatch ) => {
    return {
        logout: () => {
            dispatch(logout())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutBtn)
