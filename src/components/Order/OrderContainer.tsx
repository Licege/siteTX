import React from 'react'
import {orderType} from "../../types/types";
import {orderAPI} from "../../api/api";
import Order from "./Order";


class OrderContainer extends React.Component {
    postOrder = (order: orderType) => {
        orderAPI.postOrder(order)
    };

    render() {
        return <Order postOrder={this.postOrder} />;
    }
}

export default OrderContainer;

