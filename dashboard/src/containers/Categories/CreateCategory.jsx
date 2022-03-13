import React from 'react'
import {connect} from 'react-redux'
import {createCategory} from '../../redux/thunks/menu.thunks'
import CategoryForm from '../../pages/Categories/CategoryForm'

class CreateCategory extends React.PureComponent {

    goBack = () => this.props.history.push('/categories')

    onSubmit = ( category ) => {
      this.props.createCategory(category)
      this.goBack()
    }

    render() {
      return <CategoryForm goBack={this.goBack} onSubmit={this.onSubmit} initialValues={{is_delivery: true}}/>
    }
}

let mapStateToProps = ( state ) => {
  return {}
}

let mapDispatchToProps = ( dispatch ) => {
  return {
    createCategory: ( category ) => {
      dispatch(createCategory(category))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategory)
