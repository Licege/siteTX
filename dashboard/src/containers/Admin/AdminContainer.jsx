import React from 'react'
import {connect} from 'react-redux'
import {postAdmin, fetchAllAdmins} from '../../redux/admin-reducer'
import Admin from '../../pages/Admin/Admin'
import {requestUsers} from '../../redux/users-reducer'
import {ConfirmModal} from '../../pages/Admin/ConfirmModal'

class AdminContainer extends React.Component {
  constructor( props ) {
    super(props)

    this.state = {
      showUpgradeModal: false,
      currentUser: null,
    }
  }

  componentDidMount() {
    if (!this.props.admins.length) this.props.getAdmins()
    if (!this.props.users.length) this.props.getUsers()
  }

    openConfirmModal = ( currentUser ) => {
      return () => {
        console.log(currentUser)
        this.setState({showUpgradeModal: true, currentUser})
      }
    }

    closeConfirmModal = () => {
      this.setState({showUpgradeModal: false, currentUser: null})
    }

    confirmNewAdmin = () => {
      this.props.postAdmin(this.state.currentUser)
      this.setState({showUpgradeModal: false, currentUser: null})
    }

    render() {
      let {admins, users} = this.props
      let {showUpgradeModal, currentUser} = this.state

      return <>
        <Admin admins={admins} users={users} openConfirmModal={this.openConfirmModal}/>
        <ConfirmModal show={showUpgradeModal} user={currentUser} onConfirm={this.confirmNewAdmin}
                      cancel={this.closeConfirmModal}/>
      </>
    }
}

let mapStateToProps = ( state ) => {
  return {
    admins: state.adminPage.admins,
    users: state.usersPage.users,
  }
}

let mapDispatchToProps = ( dispatch ) => {
  return {
    getAdmins: () => {
      dispatch(fetchAllAdmins())
    },
    postAdmin: ( profile ) => {
      dispatch(postAdmin(profile))
    },
    getUsers: () => {
      dispatch(requestUsers())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)
