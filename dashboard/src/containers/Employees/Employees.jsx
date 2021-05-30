import React from 'react'
import { connect } from 'react-redux'
import Employees from '../../pages/Employees/Employees'
import { requestEmployees, requestProfessions, deleteEmployee } from '../../redux/reducers/employees.reducer'

  class EmployeesContainer extends React.Component {
    componentDidMount() {
        if (!this.props.employees.length) this.props.getEmployees()
        if (!this.props.professions.length) this.props.getProfessions()
    }

    detail = ( id ) => {
        return () => {
            this.props.history.push(`employees/edit/${id}`)
        }
    }

    createNewEmployee = () => {
        this.props.history.push(`employees/new`)
    }

    render() {
        return <Employees
            employees={this.props.employees}
            professions={this.props.professions}
            detail={this.detail}
            createNewEmployee={this.createNewEmployee}
            delete={this.props.deleteEmployee}/>
    }
}

let mapStateToProps = ( state ) => {
    return {
        employees: state.employeesPage.employees,
        professions: state.employeesPage.professions,
    }
}
let mapDispatchToProps = ( dispatch ) => {
    return {
        getEmployees: () => {
            dispatch(requestEmployees())
        },
        deleteEmployee: ( id ) => {
            dispatch(deleteEmployee(id))
        },
        getProfessions: () => {
            dispatch(requestProfessions())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesContainer)
