import React from 'react';
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import Bucket from "./Bucket";
import {deliverySettingsType, deliveryType, dishType, orderDishType} from "../../types/types";
import {
    clearBucketAC,
    increaseDishAC,
    reduceDishAC,
    removeDishAC,
    requestDeliverySettings
} from "../../redux/bucket-reducer";

type MapStatePropsType = {
    dishes: Array<dishType>
    delivery: deliveryType
    settings: Array<deliverySettingsType>
}
type MapDispatchPropsType = {
    getSettings: () => void
    increaseDish: (dish: dishType) => void
    reduceDish: (dish: dishType) => void
    removeDish: (id: number) => void
    clearBucket: () => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

class BucketContainer extends React.Component<PropsType> {
    componentDidMount(): void {
        this.props.getSettings();
        console.log(this.props.settings)
    }

    priceForDelivery = (city = 1, price: number): number => {
        let settings = {} as deliverySettingsType;
        switch(city) {
            case city = 1:
                settings = this.props.settings.find(s => s.city_id = city)!;
                return price < settings.free_delivery ? settings.price_for_delivery : 0;
            default:
                return 0;
        }
    };

    render() {
        return <Bucket dishes={this.props.dishes}
                       delivery={this.props.delivery}
                       increaseDish={this.props.increaseDish}
                       reduceDish={this.props.reduceDish}
                       removeDish={this.props.removeDish}
                       clearBucket={this.props.clearBucket}
                       priceForDelivery={this.priceForDelivery}/>
    }
}

let mapStateToProps = (state : AppStateType) => {
    return {
        dishes: state.menuPage.menu.filter(dish => state.bucket.delivery.order.find(order => order.id === dish.id) ),
        delivery: state.bucket.delivery,
        settings: state.bucket.settings
    }
};

let mapDispatchToProps = (dispatch: any) => {
    return {
        getSettings: () => {
            dispatch(requestDeliverySettings())
        },
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