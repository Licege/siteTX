import React from 'react'
import Users from '../../pages/Users/Users'
import {connect} from 'react-redux'
import {requestUsers, setCurrentPage} from '../../redux/users-reducer'

const fieldFilter = [ 'surname', 'forename', 'phone', 'email' ]

class UsersContainer extends React.Component {
  constructor( props ) {
    super(props)
    this.state = {
      filter: {},
    }
  }

  componentDidMount() {
    if (!this.props.users.length) this.props.getUsers()
  }

    onPageChanged = ( page ) => {
      this.props.setPage(page)
      this.props.getUsers(page, this.state.filter)
    }

    filterApply = () => {
      let data = this.state.filter
      fieldFilter.forEach(field => {
        if (document.getElementById(field).value) {
          data[field] = document.getElementById(field).value
          this.setState({filter: data})
          // this.state.filter[field] = document.getElementById(field).value
        } else if (!document.getElementById(field).value && this.state.filter[field]) {
          delete (data[field])
          this.setState(data)
          // delete (this.state.filter[field])
        }
      })

      this.props.setPage(1)
      this.props.getUsers(this.props.currentPage, this.state.filter)
    }

    clearFilter = () => {
      fieldFilter.forEach(field => document.getElementById(field).value = '')
      this.setState({filter: {}})
      this.props.setPage(1)
      this.props.getUsers(1, {})
    }

    detail = ( id ) => () => this.props.history.push(`users/${id}`)


    render() {
      return (
        <Users users={this.props.users}
               filters={this.props.filters}
               currentPage={this.props.currentPage}
               totalUsersCount={this.props.totalUsersCount}
               onPageChanged={this.onPageChanged}
               filterApply={this.filterApply}
               clearFilter={this.clearFilter}
               detail={this.detail} />
      )
    }
}

let mapStateToProps = ( state ) => {
  return {
    users: state.usersPage.users,
    filters: state.usersPage.filters,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
  }
}

let mapDispatchToProps = ( dispatch ) => {
  return {
    getUsers: ( page, filter ) => {
      dispatch(requestUsers(page, filter))
    },
    setPage: ( page ) => {
      dispatch(setCurrentPage(page))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)
