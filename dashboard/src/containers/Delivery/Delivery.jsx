import React from 'react'
import {connect} from 'react-redux'
import {requestOrdersDelivery, setPageAC} from '../../redux/reducers/delivery.reducer'
import Delivery from '../../pages/Delivery/main/Delivery'

const fieldFilter = ['phone', 'total_price_start', 'total_price_end', 'payment_type', 'delivery_type', 'payment_status', 'status']

class DeliveryContainer extends React.Component {
  constructor( props ) {
    super(props)
    this.state = {
      filter: {},
    }
  }

  componentDidMount() {
    if (!this.props.orders.length) this.props.getOrders()
  }

    detail = ( id ) => {
      return () => {
        this.props.history.push(`/delivery/${id}`)
      }
    }

    onChangePage = ( page ) => {
      this.props.setPage(page)
      this.props.getOrders(this.state.filter, page)
    }

    changeFilter = () => {
      let data = this.state.filter
      fieldFilter.forEach(field => {
        if (document.getElementById(field).value) {
          data[field] = document.getElementById(field).value
          this.setState({filter: data})
        } else if (!document.getElementById(field).value && this.state.filter[field]) {
          delete (data[field])
          this.setState(data)
        }
      })

      this.props.setPage(1)
      this.props.getOrders(this.state.filter, this.props.page)
    }

    clearFilter = () => {
      fieldFilter.forEach(field => document.getElementById(field).value = '')
      this.setState({filter: {}})
      this.props.setPage(1)
      this.props.getOrders({}, 1)
    }

    render() {
      return <Delivery orders={this.props.orders}
                       detail={this.detail}
                       changeFilter={this.changeFilter}
                       clearFilter={this.clearFilter}
                       totalCount={this.props.totalCount}
                       page={this.props.page}
                       onChangePage={this.onChangePage}/>
    }
}

let mapStateToProps = (state) => {
  return {
    orders: state.deliveryPage.orders,
    page: state.deliveryPage.currentPage,
    totalCount: state.deliveryPage.totalCount,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    getOrders: (filter, page) => {
      dispatch(requestOrdersDelivery(filter, page))
    },
    setPage: (page) => {
      dispatch(setPageAC(page))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryContainer)
