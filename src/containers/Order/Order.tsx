import React from 'react'
import Order from "../../components/Order/Order";
import {IOrder} from "../../types/types";
import {orderAPI} from "../../api/api";



class OrderContainer extends React.Component {

    onSubmit = (order: IOrder) => {
        let date = { ...order };
        if (typeof date.order_date !== "string") {
            date.order_date = date.order_date.toISOString()
        }
        orderAPI.postOrder(date)
    };

    render() {
        return <Order onSubmit={this.onSubmit} />;
    }
}

export default OrderContainer;

