import React from 'react'
import {orderType} from "../../types/types";
import {orderAPI} from "../../api/api";
import Order from "../../components/Order/Order";



class OrderContainer extends React.Component {

    postOrder = (order: orderType) => {
        let date = { ...order };
        date.create_at = Date.parse(new Date().toString());
        orderAPI.postOrder(order)
    };

    choiceDate(date: Date | null) {
        console.log(date ? Date.parse(date.toString()) : null) //to timestamp
    }

    render() {
        return <Order postOrder={this.postOrder} choiceDate={this.choiceDate} />;
    }
}

export default OrderContainer;

