import React from 'react';
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import Bucket from "../../components/Bucket/Bucket";
import {
    addressType,
    cityType,
    deliveryGlobalSettingsType,
    deliverySettingsType,
    deliveryType,
    dishType,
    IDeliveryPost
} from "../../types/types";
import {
    changeDishCountAC,
    clearBucketAC,
    increaseDishCountAC,
    reduceDishCountAC,
    removeDishAC, requestCities,
    requestDeliverySettings, requestGlobalDeliverySettings, postOrder
} from "../../redux/bucket-reducer";
import {formValueSelector} from "redux-form";
import {getMenu} from "../../redux/menu-reducer";

type MapStatePropsType = {
    dishes: Array<dishType>
    delivery: deliveryType
    settings: Array<deliverySettingsType>
    global_settings: deliveryGlobalSettingsType
    cities: Array<cityType>
    address: addressType
    isPaymentMethod: string
    isDeliveryMethod: string
}
type MapDispatchPropsType = {
    getDishes: () => void
    getSettings: () => void
    getGlobalSettings: () => void
    increaseDishCount: (dish: dishType) => void
    reduceDishCount: (dish: dishType) => void
    changeDishCount: (dish: dishType, count: number) => void
    removeDish: (id: number) => void
    clearBucket: () => void
    getCities: () => void
    postOrder: (order: IDeliveryPost) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

type StateType = {
    test_payment_method: string
    test_delivery_method: string
    deliveryPrice: number
    orderPrice: number
}

class BucketContainer extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props)
        this.state = {
            test_payment_method: 'cash',
            test_delivery_method: 'home',
            deliveryPrice: this.priceForDelivery(undefined, this.props.delivery.total_price),
            orderPrice: this.props.delivery.total_price
        }
    }

    componentDidMount(): void {
        if (!this.props.settings.length) this.props.getSettings();
        if (!Object.keys(this.props.global_settings).length) this.props.getGlobalSettings();
        if (!this.props.cities.length) this.props.getCities();
        if (!this.props.dishes.length) this.props.getDishes();
    }

    componentDidUpdate(prevProps: Readonly<MapStatePropsType & MapDispatchPropsType>, prevState: Readonly<StateType>): void {
        if (prevProps.address && this.props.address && prevProps.delivery.total_price !== this.props.delivery.total_price) {
            this.setState({deliveryPrice: this.priceForDelivery(this.props.address.city, this.props.delivery.total_price)})
            this.setState({orderPrice: this.props.delivery.total_price})
        }
    }

    priceForDelivery = (city = 1, price: number): number => {
        let settings = this.props.settings.find(s => s.city_id = city)!;
        return price < settings.free_delivery ? settings.price_for_delivery : 0;
    };

    onChange = (dish: dishType) => {
        return (event: {target: HTMLInputElement; }) => {
            let value = event.target.value
            if (value === '') value = '1'
            this.props.changeDishCount(dish, parseInt(value, 10))
        }
    }

    choiceDate(date: Date | null) {
        console.log(date ? Date.parse(date.toString()) : null) //to timestamp
    }

    onSubmit = (data: IDeliveryPost) => {
        let post = {...data,
            delivery: {...this.props.delivery, delivery_price: this.state.deliveryPrice},
            create_at:  Date.parse(new Date().toString())
        }
        console.log(post);
        this.props.postOrder(post)
    }

    render() {
        return <Bucket dishes={this.props.dishes}
                       delivery={this.props.delivery}
                       deliveryPrice={this.state.deliveryPrice}
                       orderPrice={this.state.orderPrice}
                       increaseDishCount={this.props.increaseDishCount}
                       reduceDishCount={this.props.reduceDishCount}
                       removeDish={this.props.removeDish}
                       clearBucket={this.props.clearBucket}
                       priceForDelivery={this.priceForDelivery}
                       settings={this.props.settings}
                       global_settings={this.props.global_settings}
                       cities={this.props.cities}
                       paymentMethod={this.state.test_payment_method}
                       deliveryMethod={this.state.test_delivery_method}
                       choiceDate={this.choiceDate}
                       onSubmit={this.onSubmit}
                       onChange={this.onChange} />
    }
}

let mapStateToProps = (state : AppStateType) => {
    const selector = formValueSelector('bucketOrderForm');
    return {
        dishes: state.menuPage.menu.filter(dish => state.bucket.delivery.order.find(order => order.id === dish.id) ),
        delivery: state.bucket.delivery,
        settings: state.bucket.settings,
        global_settings: state.bucket.global_settings,
        cities: state.bucket.cities,
        address: selector(state, 'address')
    }
};

let mapDispatchToProps = (dispatch: any) => {
    return {
        getDishes: () => {
            dispatch(getMenu());
        },
        getSettings: () => {
            dispatch(requestDeliverySettings())
        },
        getGlobalSettings: () => {
            dispatch(requestGlobalDeliverySettings())
        },
        increaseDishCount: (dish: dishType) => {
            dispatch(increaseDishCountAC(dish))
        },
        reduceDishCount: (dish: dishType) => {
            dispatch(reduceDishCountAC(dish))
        },
        changeDishCount: (dish: dishType, count: number) => {
            dispatch(changeDishCountAC(dish, count))
        },
        removeDish: (id: number) => {
            dispatch(removeDishAC(id))
        },
        clearBucket: () => {
            dispatch(clearBucketAC())
        },
        getCities: () => {
            dispatch(requestCities())
        },
        postOrder: (order: IDeliveryPost) => {
            dispatch(postOrder(order))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (BucketContainer);