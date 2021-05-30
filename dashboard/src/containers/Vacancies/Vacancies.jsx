import React from 'react'
import { connect } from 'react-redux'
import { createNewVacancy, deleteVacancy, requestVacancies } from '../../redux/reducers/vacancies.reducer'
import Vacancies from '../../pages/Vacancies/all'

class VacanciesContainer extends React.Component {
    componentDidMount() {
        if (!this.props.vacancies.length) this.props.getVacancies()
    };

    createNewVacancy = () => {
        this.props.history.push(`vacancies/new`)
    }

    removeVacancy = ( id ) => {
        return () => {
            this.props.deleteVacancy(id)
        }
    }

    changeVacancy = ( id ) => {
        return () => {
            this.props.history.push(`vacancies/edit/${id}`)
        }
    }

    render() {
        return <>
            {this.props.isFetching ? 'Показать прелоадер' : null}
            <Vacancies vacancies={this.props.vacancies}
                       createVacancy={this.createNewVacancy}
                       changeVacancy={this.changeVacancy}
                       removeVacancy={this.removeVacancy}/>
        </>
    }

}

let mapStateToProps = ( state ) => {
    return {
        vacancies: state.vacanciesPage.vacancies,
        currentVacancy: state.vacanciesPage.currentVacancy,
        isFetching: state.vacanciesPage.isFetching,
    }
}

export default connect(mapStateToProps,
    {
        getVacancies: requestVacancies,
        createVacancy: createNewVacancy,
        deleteVacancy: deleteVacancy,
    })(VacanciesContainer)
