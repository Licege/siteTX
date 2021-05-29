import React from 'react'
import { connect } from 'react-redux'
import { requestDeliverySettingsById, updateDeliverySettings } from '../../../redux/reducers/delivery.reducer'
import SettingsForm from '../../../pages/Delivery/Settings/Tabs/Common_Settings/SettingsForm'

class SettingsCommonEdit extends React.Component {
    componentDidMount() {
        if (!this.props.currentSettings || this.props.currentSettings.id !== this.props.match.params.id) this.props.getSettingsById(this.props.match.params.id)
    }

    onSubmit = ( settings ) => {
        this.props.updateSettings(settings)
        this.goBack()
    }

    goBack = () => {
        this.props.history.goBack()
    }

    render() {
        return <SettingsForm currentSettings={this.props.currentSettings}
                             initialValues={this.props.currentSettings}
                             onSubmit={this.onSubmit}
                             cancel={this.goBack}/>
    }
}

let mapStateToProps = ( state ) => {
    return {
        currentSettings: state.deliveryPage.currentSettings,
    }
}

let mapDispatchToProps = ( dispatch ) => {
    return {
        getSettingsById: ( id ) => {
            dispatch(requestDeliverySettingsById(id))
        },
        updateSettings: ( settings ) => {
            dispatch(updateDeliverySettings(settings))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsCommonEdit)
