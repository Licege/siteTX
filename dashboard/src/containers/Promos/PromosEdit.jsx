import React from 'react'
import { connect } from 'react-redux'
import { requestPromoById, updatePromo } from '../../redux/reducers/promos.reducer'
import PromoForm from '../../pages/Promos/form/PromoForm'
import { Promo } from '../../pages/Promos/Promo'

class PromosEdit extends React.Component {
    constructor( props ) {
        super(props)

        this.state = {
            changeMode: false,
            file: '',
            description: '',
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id
        this.props.getPromo(id)
    }

    goBack = () => {
        this.props.history.push('/promos')
    }

    toggleChangeMode = () => {
        this.setState(state => ({ changeMode: !state.changeMode }))
    }

    uploadFile = ( file ) => {
        this.setState({ file })
    }

    changeDescription = ( description ) => {
        this.setState({ description })
    }

    onSubmit = ( data ) => {
        let formData = new FormData()
        for (let key in data) {
            if (data.hasOwnProperty(key)) formData.append(key, data[key])
        }
        this.state.file && formData.set('image', this.state.file)
        formData.set('description', this.state.description)

        this.props.updatePromo(formData, data.id)
        this.goBack()
    }

    render() {
        let { promo } = this.props
        let { changeMode } = this.state

        return changeMode
            ? <PromoForm onSubmit={this.onSubmit}
                         initialValues={promo}
                         promo={promo}
                         uploadFile={this.uploadFile}
                         changeDescription={this.changeDescription}
                         goBack={this.goBack}/>
            : <Promo promo={promo} onChange={this.toggleChangeMode} goBack={this.goBack}/>
    }
}

let mapStateToProps = ( state ) => {
    return {
        promo: state.promosPage.currentPromo,
    }
}

let mapDispatchToProps = ( dispatch ) => {
    return {
        getPromo: ( id ) => {
            dispatch(requestPromoById(id))
        },
        updatePromo: ( promo, id ) => {
            dispatch(updatePromo(promo, id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PromosEdit)
