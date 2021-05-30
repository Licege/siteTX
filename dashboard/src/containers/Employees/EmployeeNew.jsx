import React from 'react'
import { connect } from 'react-redux'
import CreateProfile from '../../pages/Employees/new/Employee'
import { createNewEmployee, requestProfessions } from '../../redux/reducers/employees.reducer'

class CreateEmployee extends React.Component {
    componentDidMount() {
        if (this.props.professions.length === 0) {
            this.props.getProfessions()
        }
    }

    postEmployee = ( profile ) => {
        let data = { ...profile }
        data.profession = parseInt(data.profession, 10)
        data.fileId = parseInt(data.fileId, 10)
        this.props.createEmployee(data)
        this.props.history.goBack()
    }

    cancel = () => {
        this.props.history.goBack()
    }

    render() {
        return (
            <CreateProfile initialValues={this.props.employee}
                           employee={this.props.employee}
                           professions={this.props.professions}
                           cancel={this.cancel}
                           onSubmit={this.postEmployee}/>
        )
    }
}

let mapStateToProps = ( state ) => {
    return {
        employee: state.employeesPage.newEmployee,
        professions: state.employeesPage.professions,
    }
}
let mapDispatchToProps = ( dispatch ) => {
    return {
        createEmployee: ( profile ) => {
            dispatch(createNewEmployee(profile))
        },
        getProfessions: () => {
            dispatch(requestProfessions())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEmployee)
