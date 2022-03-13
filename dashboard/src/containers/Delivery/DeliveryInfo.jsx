import React from 'react'
import {connect} from 'react-redux'
import {
  addDishIntoListAC,
  changeDeliveryTypeAC,
  decreaseDishCountAC,
  increaseDishCountAC,
  removeDishFromListAC,
  requestDeliverySettings,
  requestOrderDeliveryById,
  updateOrderDelivery,
} from '../../redux/reducers/delivery.reducer'
import Index from '../../pages/Delivery/delivery-info'
import {
  requestCategories,
  requestDishes,
  requestDishesByCategory,
} from '../../redux/thunks/menu.thunks'
// import { formValueSelector } from 'redux-form'

class DeliveryInfoContainer extends React.Component {
  constructor( props ) {
    super(props)
    this.state = {
      filter: '',
      isOpen: false,
    }
  }

  componentDidMount() {
    this.props.getOrder(this.props.match.params.id)
    this.props.getMenu()
    if (!this.props.categories.length) this.props.getCategories()
    if (!this.props.settings.length) this.props.getSettings()
  }

  componentDidUpdate( prevProps, prevState, snapshot ) {
    if (prevState.filter !== this.state.filter) {
      if (this.state.filter === '') this.props.getMenu()
      else this.props.getMenuByCategory(this.state.filter)
    }
    if (prevProps.deliveryType && prevProps.deliveryType !== this.props.deliveryType) {
      this.changeDeliveryType(this.props.deliveryType)
    }
  }

    changeDeliveryType = ( dType ) => {
      this.props.changeDeliveryType(dType)
    }

    toggleModal = () => {
      this.setState({isOpen: !this.state.isOpen})
    }

    applyFilterModal = () => {
      let category = document.getElementById('select-category-modal').value
      this.setState({filter: category})
    }

    addDish = ( dish ) => {
      return () => {
        this.props.addDishIntoList(dish)
      }
    }

    increaseDish = ( id ) => {
      return () => {
        this.props.increaseDishCount(id)
      }
    }

    decreaseDish = ( id ) => {
      return () => {
        this.props.decreaseDishCount(id)
      }
    }

    removeDish = ( id ) => {
      return () => {
        this.props.deleteDishFromList(id)
      }
    }

    update = ( order ) => {
      this.props.updateOrder(order)
      this.props.history.push('/delivery')
    }

    render() {
      return <Index order={this.props.order}
                    onSubmit={this.update}
                    menu={this.props.dishes}
                    categories={this.props.categories}
                    show={this.state.isOpen}
                    toggleModal={this.toggleModal}
                    applyFilterModal={this.applyFilterModal}
                    addDish={this.addDish}
                    increaseDish={this.increaseDish}
                    decreaseDish={this.decreaseDish}
                    removeDish={this.removeDish}
                    currentCategory={this.state.filter}
                    initialValues={this.props.order}/>
    }
}

let mapStateToProps = ( state ) => {
  // const selector = formValueSelector('delivery-info')
  return {
    order: state.deliveryPage.currentOrder,
    dishes: state.menuPage.dishes,
    categories: state.menuPage.categories,
    settings: state.deliveryPage.settings,
    // deliveryType: selector(state, 'delivery_type'),
    deliveryType: 'home'
  }
}

let mapDispatchToProps = ( dispatch ) => {
  return {
    getOrder: ( id ) => {
      dispatch(requestOrderDeliveryById(id))
    },
    updateOrder: ( order ) => {
      dispatch(updateOrderDelivery(order))
    },
    getMenu: () => {
      dispatch(requestDishes())
    },
    getCategories: () => {
      dispatch(requestCategories())
    },
    getMenuByCategory: ( category ) => {
      dispatch(requestDishesByCategory(category))
    },
    addDishIntoList: ( dish ) => {
      dispatch(addDishIntoListAC(dish))
    },
    increaseDishCount: ( id ) => {
      dispatch(increaseDishCountAC(id))
    },
    decreaseDishCount: ( id ) => {
      dispatch(decreaseDishCountAC(id))
    },
    deleteDishFromList: ( id ) => {
      dispatch(removeDishFromListAC(id))
    },
    changeDeliveryType: ( dType ) => {
      dispatch(changeDeliveryTypeAC(dType))
    },
    getSettings: () => {
      dispatch(requestDeliverySettings())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryInfoContainer)
