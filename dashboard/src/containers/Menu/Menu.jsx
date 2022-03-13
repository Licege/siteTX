import React from 'react'
import {connect} from 'react-redux'
import Menu from '../../pages/Menu/main/Menu'
import {deleteDish, requestCategories, requestDishes} from '../../redux/thunks/menu.thunks'
import ModalDelete from '../../components/Modals/ModalDelete';
import {getMenu} from '../../redux/getters/menu.getters'

class MenuContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentDish: null,
      isOpenDelModal: false,
    }
  }

  componentDidMount() {
    if (!this.props.dishes.length) this.props.getDishes();
    if (!this.props.categories.length) this.props.getCategories();
  }

    newDish = () => {
      this.props.history.push('menu/new')
    }

    detail = (id) => {
      return () => {
        this.props.history.push(`menu/edit/${id}`)
      }
    }

    openDelModal = (currentDish) => {
      return () => {
        this.setState({isOpenDelModal: true, currentDish})
      }
    }

    closeDelModal = () => {
      this.setState({isOpenDelModal: false, currentDish: null})
    }

    deleteDish = () => {
      this.props.deleteDish(this.state.currentDish.id)
      this.closeDelModal()
    }

    savePhoto = (file) => {
      console.log('Сделать санку для пдф', file)
    }

    onPhotoSelected = (e) => {
      if (e.target.files.length) this.savePhoto(e.target.files[0])
    }

    render() {
      let {dishes, categories} = this.props
      let {isOpenDelModal} = this.state

      return (
        <>
          <Menu dishes={dishes}
                categories={categories}
                newDish={this.newDish}
                openDelModal={this.openDelModal}
                detail={this.detail}
                onPhotoSelected={this.onPhotoSelected}/>
          {this.state.currentDish
            ? <ModalDelete show={isOpenDelModal}
                           onClose={this.closeDelModal}
                           title={this.state.currentDish.title}
                           onRemove={this.deleteDish}/> : null}
        </>
      )
    }
}

let mapStateToProps = (state) => {
  return {
    dishes: getMenu(state),
    categories: state.menuPage.categories,
  }
};

let mapDispatchToProps = (dispatch) => {
  return {
    getDishes: () => {
      dispatch(requestDishes())
    },
    getCategories: () => {
      dispatch(requestCategories())
    },
    deleteDish: (id) => {
      dispatch(deleteDish(id))
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
