import React from 'react'
import {connect} from 'react-redux'
import {requestCategory, updateCategory} from '../../redux/thunks/menu.thunks'
import CategoryForm from '../../pages/Categories/CategoryForm'

class EditCategory extends React.PureComponent {
  componentDidMount() {
    let id = this.props.match.params.id
    if (!this.props.category || this.props.category.id !== id) this.props.getCategory(id)
  }

    onSubmit = (category) => {
      this.props.updateCategory(category)
      this.goBack()
    }

    goBack = () => this.props.history.push('/categories')

    render() {
      return <CategoryForm category={this.props.category}
                           initialValues={this.props.category}
                           onSubmit={this.onSubmit}
                           goBack={this.goBack}/>
    }
}

let mapStateToProps = ( state ) => {
  return {
    category: state.menuPage.category,
  }
}

let mapDispatchToProps = ( dispatch ) => {
  return {
    getCategory: ( id ) => {
      dispatch(requestCategory(id))
    },
    updateCategory: ( category ) => {
      dispatch(updateCategory(category))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory)
