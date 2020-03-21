import React from 'react';
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import Bucket from "./Bucket";
import {dishType, orderDishType} from "../../types/types";
import {clearBucketAC, increaseDishAC, reduceDishAC, removeDishAC} from "../../redux/bucket-reducer";

type MapStatePropsType = {
    dishes: Array<dishType>
    order: Array<orderDishType>
}
type MapDispatchPropsType = {
    increaseDish: (id: number) => void
    reduceDish: (id: number) => void
    removeDish: (id: number) => void
    clearBucket: () => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

class BucketContainer extends React.Component<PropsType> {


    render() {
        return <Bucket dishes={this.props.dishes}
                       order={this.props.order}
                       increaseDish={this.props.increaseDish}
                       reduceDish={this.props.reduceDish}
                       removeDish={this.props.removeDish}
                       clearBucket={this.props.clearBucket} />
    }
}

let mapStateToProps = (state : AppStateType) => {
    return {
        dishes: state.menuPage.menu.filter(dish => state.bucket.order.find(order => order.id === dish.id) ),
        order: state.bucket.order
    }
};

let mapDispatchToProps = (dispatch: any) => {
    return {
        increaseDish: (id: number) => {
            dispatch(increaseDishAC(id))
        },
        reduceDish: (id: number) => {
            dispatch(reduceDishAC(id))
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