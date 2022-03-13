import React from 'react'
import {requestVacancy, updateVacancy} from '../../redux/reducers/vacancies.reducer'
import {connect} from 'react-redux'
import CreateVacancy from '../../pages/Vacancies/new'

class EditVacancy extends React.Component {
  constructor( props ) {
    super(props)
    this.state = {
      file: '',
    }
  }

  componentDidMount() {
    if (!this.props.currentVacancy || this.props.currentVacancy !== this.props.match.params.id) this.props.getVacancy(this.props.match.params.id)
  }

    goBack = () => {
      this.props.history.goBack()
    }

    uploadFile = ( file ) => {
      this.setState({file})
    }

    onSubmit = ( vacancy ) => {
      let formData = new FormData()
      for (let key in vacancy) {
        formData.append(key, vacancy[key])
      }
      if (this.state.file) {
        formData.append('image', this.state.file)
      }
      this.props.updateVacancy(formData, vacancy.id)
      this.props.history.goBack()
    }

    render() {
      return <CreateVacancy initialValues={this.props.currentVacancy}
                            onSubmit={this.onSubmit}
                            uploadFile={this.uploadFile}
                            cancel={this.goBack}
                            vacancy={this.props.currentVacancy}/>
    }
}

let mapStateToProps = ( state ) => {
  return {
    currentVacancy: state.vacanciesPage.currentVacancy,
  }
}

let mapDispatchToProps = ( dispatch ) => {
  return {
    getVacancy: ( id ) => {
      dispatch(requestVacancy(id))
    },
    updateVacancy: ( vacancy, id ) => {
      dispatch(updateVacancy(vacancy, id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditVacancy)
