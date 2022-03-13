import React from 'react'
import SettingsForm from '../../../pages/Delivery/Settings/Tabs/Common_Settings/SettingsForm'
import {createDeliverySettings} from '../../../redux/reducers/delivery.reducer'
import {connect} from 'react-redux'

class SettingsCommonNew extends React.Component {
    onSubmit = ( settings ) => {
      console.log(settings)
      this.props.createSettings(settings)
      this.goBack()
    }

    goBack = () => {
      this.props.history.goBack()
    }

    render() {
      return <SettingsForm onSubmit={this.onSubmit} cancel={this.goBack}/>
    }
}

let mapStateToProps = ( state ) => {
  return {}
}

let mapDispatchToProps = ( dispatch ) => {
  return {
    createSettings: ( settings ) => {
      dispatch(createDeliverySettings(settings))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsCommonNew)
