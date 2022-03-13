import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {requestCurrentEmployee, updateCurrentEmployee, requestProfessions} from '../../redux/reducers/employees.reducer'
import ProfileEmployee from '../../pages/Employees/id/ProfileEmployee'

class EmployeeContainer extends React.Component {
  refreshEmployee() {
    let id = this.props.match.params.id
    this.props.getEmployeeById(id)
  }

    onSubmit = ( profile ) => {
      let data = {...profile}
      data.profession = parseInt(data.profession, 10)
      data.fileId = parseInt(data.fileId, 10)
      this.props.updateEmployee(data)
      this.props.history.goBack()
    }

    cancel = () => {
      this.props.history.goBack()
    }

    componentDidMount() {
      if (this.props.professions.length === 0) {
        this.props.getProfessions()
      }
      this.refreshEmployee()
    }

    render() {
      return (
        <ProfileEmployee employee={this.props.currentEmployee}
                         professions={this.props.professions}
                         onSubmit={this.onSubmit}
                         cancel={this.cancel}/>
      )
    }
}

let mapStateToProps = ( state ) => {
  return {
    currentEmployee: state.employeesPage.currentEmployee,
    professions: state.employeesPage.professions,
  }
}

let mapDispatchToProps = ( dispatch ) => {
  return {
    getEmployeeById: ( id ) => {
      dispatch(requestCurrentEmployee(id))
    },
    updateEmployee: ( profile ) => {
      dispatch(updateCurrentEmployee(profile))
    },
    getProfessions: () => dispatch(requestProfessions())
  }
}

let WithUrlDataUserContainer = withRouter(EmployeeContainer)

export default connect(mapStateToProps, mapDispatchToProps)(WithUrlDataUserContainer)
