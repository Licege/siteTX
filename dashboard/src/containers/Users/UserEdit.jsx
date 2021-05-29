import React from 'react'
import { requestCurrentUser, updateCurrentUser } from '../../redux/users-reducer'
import { connect } from 'react-redux'
import Profile from '../../pages/Users/Profile/Profile'
import { withRouter } from 'react-router-dom'


class UserContainer extends React.Component {
    refreshProfile() {
        let id = this.props.match.params.id
        this.props.getUserById(id)
    }

    cancel = () => {
        this.props.history.goBack()
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate( prevProps, prevState, snapshot ) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile user={this.props.currentUser} updateProfile={this.props.updateCurrentUser} cancel={this.cancel}/>
        )
    }
}

let mapStateToProps = ( state ) => {
    return {
        currentUser: state.usersPage.currentUser,
    }
}

let WithUrlDataUserContainer = withRouter(UserContainer)

export default connect(mapStateToProps, {
    getUserById: requestCurrentUser,
    updateCurrentUser,
})(WithUrlDataUserContainer)

