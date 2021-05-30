import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { requestOrders } from '../../redux/reducers/orders.reducer'
import Orders from '../../pages/Orders/Orders'

class OrdersContainer extends React.Component {
    componentDidMount() {
        if (!this.props.orders.length) this.props.getOrders()
    }

    render() {
        return <Orders orders={this.props.orders}/>
    }
}

let mapStateToProps = ( state ) => {
    return {
        orders: state.ordersPage.orders,
    }
}

let mapDispatchToProps = ( dispatch ) => {
    return {
        getOrders: () => {
            dispatch(requestOrders())
        },
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(OrdersContainer)
