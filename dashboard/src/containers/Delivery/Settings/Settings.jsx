import React from 'react'
import { connect } from 'react-redux'
import {
    createDeliverySettings,
    deleteDeliverySettings,
    requestDeliverySettings,
    requestGlobalDeliverySettings,
    updateDeliverySettings,
    updateGlobalDeliverySettings,
} from '../../../redux/thunks/delivery.thunks'
import Settings from '../../../pages/Delivery/Settings/Settings'

class SettingsContainer extends React.Component {
    componentDidMount() {
        if (!this.props.settings.length) this.props.getSettings()
        if (!Object.keys(this.props.globalSettings).length) this.props.getGlobalSettings()
    }

    postGlobalSettings = ( settings ) => {
        this.props.updateGlobalSettings(settings)
    }

    createSettings = () => {
        this.props.history.push(`delivery-settings/new`)
    }

    editSettings = ( id ) => {
        return () => {
            this.props.history.push(`delivery-settings/edit/${id}`)
        }
    }

    render() {
        return <Settings settings={this.props.settings}
                         globalSettings={this.props.globalSettings}
                         createSettings={this.createSettings}
                         editSettings={this.editSettings}
                         postGlobalSettings={this.postGlobalSettings}/>
    }
}

let mapStateToProps = (state) => {
    return {
        settings: state.deliveryPage.settings,
        globalSettings: state.deliveryPage.globalSettings,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        getGlobalSettings: () => {
            dispatch(requestGlobalDeliverySettings())
        },
        updateGlobalSettings: (settings) => {
            dispatch(updateGlobalDeliverySettings(settings))
        },
        getSettings: () => {
            dispatch(requestDeliverySettings())
        },
        createSettings: (settings) => {
            dispatch(createDeliverySettings(settings))
        },
        updateSettings: (settings) => {
            dispatch(updateDeliverySettings(settings))
        },
        deleteSettings: (id) => {
            dispatch(deleteDeliverySettings(id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer)
