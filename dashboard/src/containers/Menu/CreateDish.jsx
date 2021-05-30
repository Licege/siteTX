import React from 'react'
import { connect } from 'react-redux'
import { createDish, requestCategories } from '../../redux/thunks/menu.thunks'
import FormDish from '../../pages/Menu/form/FormDish'

class CreateDishContainer extends React.Component {
    constructor( props ) {
        super(props)
        this.state = {
            file: '',
        }
    }

    componentDidMount() {
        if (!this.props.categories.length) this.props.getCategories()
    }

    createDish = ( dish ) => {
        let formData = new FormData()
        for (let key in dish) {
            formData.append(key, dish[key])
        }
        formData.weight = parseInt(formData.weight, 10)
        formData.price = parseInt(formData.price, 10)
        formData.append('image', this.state.file)
        this.props.createDish(formData)
        this.props.history.goBack()
    }

    cancel = () => {
        this.props.history.goBack()
    }

    uploadFile = ( file ) => {
        this.setState({ file })
    }

    render() {
        return <FormDish onSubmit={this.createDish}
                         categories={this.props.categories}
                         cancel={this.cancel}
                         uploadFile={this.uploadFile}
                         initialValues={{ is_delivery: true }}/>
    }
}

let mapStateToProps = ( state ) => {
    return {
        categories: state.menuPage.categories,
    }
}

let mapDispatchToProps = ( dispatch ) => {
    return {
        createDish: ( dish ) => {
            dispatch(createDish(dish))
        },
        getCategories() {
            dispatch(requestCategories())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDishContainer)
