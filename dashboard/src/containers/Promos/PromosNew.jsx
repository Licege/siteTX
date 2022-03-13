import React from 'react'
import PromoForm from '../../pages/Promos/form/PromoForm'
import {postPromo} from '../../redux/reducers/promos.reducer'
import {connect} from 'react-redux'

class PromosNewContainer extends React.Component {
  constructor( props ) {
    super(props)

    this.state = {
      file: '',
      description: '',
    }
  }

    onSubmit = ( data ) => {
      let formData = new FormData()
      for (let key in data) {
        if (data.hasOwnProperty(key)) formData.append(key, data[key])
      }
      this.state.file && formData.append('image', this.state.file)
      this.state.description && formData.append('description', this.state.description)
      this.props.createPromo(formData)
      this.goBack()
    }

    goBack = () => {
      this.props.history.push('/promos')
    }

    uploadFile = ( file ) => {
      this.setState({file})
    }

    changeDescription = ( description ) => {
      this.setState({description})
    }


    render() {
      return <PromoForm onSubmit={this.onSubmit}
                        changeDescription={this.changeDescription}
                        uploadFile={this.uploadFile}
                        goBack={this.goBack}/>
    }
}

let mapStateToProps = ( state ) => {
  return {}
}

let mapDispatchToProps = ( dispatch ) => {
  return {
    createPromo: ( promo ) => {
      dispatch(postPromo(promo))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PromosNewContainer)
