import React from 'react'
import { connect } from 'react-redux'
import { createNewVacancy } from '../../redux/reducers/vacancies.reducer'
import CreateVacancy from '../../pages/Vacancies/new'

class CreateVacancy extends React.Component {
    constructor( props ) {
        super(props)
        this.state = {
            file: '',
        }
    }

    cancel = () => {
        this.props.history.goBack()
    }

    postVacancy = ( vacancy ) => {
        let formData = new FormData()
        for (let key in vacancy) {
            formData.append(key, vacancy[key])
        }
        formData.append('image', this.state.file)
        this.props.createVacancy(formData)
        this.props.history.goBack()
    }

    uploadFile = ( file ) => {
        this.setState({ file })
    }

    render() {
        return (
            <CreateVacancy onSubmit={this.postVacancy} uploadFile={this.uploadFile} cancel={this.cancel}/>
        )
    }
}

let mapStateToProps = ( state ) => {
    return {}
}

let mapDispatchToProps = ( dispatch ) => {
    return {
        createVacancy: ( vacancy ) => {
            dispatch(createNewVacancy(vacancy))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateVacancy)
