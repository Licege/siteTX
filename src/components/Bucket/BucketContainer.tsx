import React from 'react';
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import Bucket from "./Bucket";
import {deliveryType, dishType, orderDishType} from "../../types/types";
import {clearBucketAC, increaseDishAC, reduceDishAC, removeDishAC} from "../../redux/bucket-reducer";

type MapStatePropsType = {
    dishes: Array<dishType>
    delivery: deliveryType
    order: Array<orderDishType>
}
type MapDispatchPropsType = {
    increaseDish: (dish: dishType) => void
    reduceDish: (dish: dishType) => void
    removeDish: (id: number) => void
    clearBucket: () => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

class BucketContainer extends React.Component<PropsType> {
    componentDidMount(): void {
        console.log(this.props.delivery)
    }


    render() {
        return <Bucket dishes={this.props.dishes}
                       delivery={this.props.delivery}
                       increaseDish={this.props.increaseDish}
                       reduceDish={this.props.reduceDish}
                       removeDish={this.props.removeDish}
                       clearBucket={this.props.clearBucket} />
    }
}

let mapStateToProps = (state : AppStateType) => {
    return {
        dishes: state.menuPage.menu.filter(dish => state.bucket.delivery.order.find(order => order.id === dish.id) ),
        delivery: state.bucket.delivery,
        order: state.bucket.delivery.order,
    }
};

let mapDispatchToProps = (dispatch: any) => {
    return {
        increaseDish: (dish: dishType) => {
            dispatch(increaseDishAC(dish))
        },
        reduceDish: (dish: dishType) => {
            dispatch(reduceDishAC(dish))
        },
        removeDish: (id: number) => {
            dispatch(removeDishAC(id))
        },
        clearBucket: () => {
            dispatch(clearBucketAC())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (BucketContainer);