import React from 'react'
import {connect} from 'react-redux'
import {deleteDish, requestCategories, requestDish, updateDish} from '../../redux/thunks/menu.thunks'
import FormDish from '../../pages/Menu/form/FormDish'
import ModalDelete from '../../components/Modals/ModalDelete'

class EditDishContainer extends React.Component {
  constructor( props ) {
    super(props)
    this.state = {
      file: '',
      openDelModal: false,
    }
  }

  componentDidMount() {
    let id = this.props.match.params.id
    if (!this.props.dish || this.props.dish.id !== id) {
      this.props.getDish(id)
    }
    if (!this.props.categories.length) this.props.getCategories()
  }

    onSubmit = ( dish ) => {
      let formData = new FormData()
      for (let key in dish) {
        if (dish.hasOwnProperty(key)) formData.append(key, dish[key])
      }
      this.state.file && formData.append('image', this.state.file)
      this.props.updateDish(formData, dish.id)
      this.props.history.push('/menu')
    }

    goToMenu = () => {
      this.props.history.push('/menu')
    }

    deleteDish = ( id ) => {
      return () => {
        this.props.deleteDish(id)
        this.goToMenu()
      }
    }

    toggleDelModal = () => {
      this.setState(state => ({openDelModal: !state.openDelModal}))
    }

    cancel = () => {
      this.props.history.goBack()
    }

    uploadFile = ( file ) => {
      this.setState({file})
    }

    render() {
      let {dish, categories} = this.props
      let {openDelModal} = this.state

      return (
        dish ?
          <>
            <FormDish initialValues={dish}
                      onSubmit={this.onSubmit}
                      dish={dish}
                      categories={categories}
                      cancel={this.goToMenu}
                      uploadFile={this.uploadFile}
                      openDelModal={this.toggleDelModal}/>
            <ModalDelete show={openDelModal}
                         title={dish.title}
                         onRemove={this.deleteDish(dish.id)}
                         onClose={this.toggleDelModal}/>
          </> : null
      )
    }
}

let mapStateToProps = ( state ) => {
  return {
    dish: state.menuPage.dish,
    categories: state.menuPage.categories,
  }
}

let mapDispatchToProps = ( dispatch ) => {
  return {
    getDish: ( id ) => {
      dispatch(requestDish(id))
    },
    getCategories: () => {
      dispatch(requestCategories())
    },
    updateDish: ( dish, id ) => {
      dispatch(updateDish(dish, id))
    },
    deleteDish: ( id ) => {
      dispatch(deleteDish(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDishContainer)
