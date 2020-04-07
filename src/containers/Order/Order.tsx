import React from 'react'
import {orderAPI} from "../../api/api";
import Order from "../../components/Order/Order";
import {IOrder} from "../../types/types";



class OrderContainer extends React.Component {

    onSubmit = (order: IOrder) => {
        console.log(order)
        /*
        let date = { ...order };
        date.create_at = Date.parse(new Date().toString());
        orderAPI.postOrder(order)*/
    };

    choiceDate(date: Date | null) {
        console.log(date ? Date.parse(date.toString()) : null) //to timestamp
    }

    render() {
        return <Order onSubmit={this.onSubmit} />;
    }
}

export default OrderContainer;

