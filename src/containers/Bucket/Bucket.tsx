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

type MapStatePropsType = {
    dishes: Array<dishType>
    delivery: deliveryType
    settings: Array<deliverySettingsType>
    global_settings: deliveryGlobalSettingsType
    cities: Array<cityType>
    address: addressType
    paymentType: string
    deliveryType: string
}
type MapDispatchPropsType = {
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
    deliveryPrice: number
    orderPrice: number
}

class BucketContainer extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props)
        this.state = {
            deliveryPrice: this.priceForDelivery(undefined, this.props.delivery.total_price),
            orderPrice: this.props.delivery.total_price
        }
    }

    componentDidMount(): void {
        if (!this.props.settings.length) this.props.getSettings();
        if (!Object.keys(this.props.global_settings).length) this.props.getGlobalSettings();
        if (!this.props.cities.length) this.props.getCities();
    }

    componentDidUpdate(prevProps: Readonly<MapStatePropsType & MapDispatchPropsType>, prevState: Readonly<StateType>): void {
        if (prevProps.address && this.props.address && prevProps.delivery.total_price !== this.props.delivery.total_price) {
            this.setState({deliveryPrice: this.priceForDelivery(this.props.address.city, this.props.delivery.total_price)})
            this.setState({orderPrice: this.props.delivery.total_price})
        }
        if (prevProps.deliveryType && this.props.address && prevProps.deliveryType !== this.props.deliveryType) {
            this.setState({deliveryPrice: this.priceForDelivery(this.props.address.city, this.props.delivery.total_price)})
        }
    }

    priceForDelivery = (city = 1, price: number): number => {
        console.log(this.props.deliveryType === 'restaurant')
        if (this.props.settings.length && this.props.deliveryType !== 'restaurant') {
            let settings = this.props.settings.find(s => s.city_id = city)!;
            return price < settings.free_delivery ? settings.price_for_delivery : 0;
        } else return 0
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
                       settings={this.props.settings}
                       global_settings={this.props.global_settings}
                       cities={this.props.cities}
                       paymentMethod={this.props.paymentType}
                       deliveryMethod={this.props.deliveryType}
                       choiceDate={this.choiceDate}
                       onSubmit={this.onSubmit}
                       onChange={this.onChange} />
    }
}

let mapStateToProps = (state : AppStateType) => {
    const selector = formValueSelector('bucketOrderForm');
    return {
        dishes: state.bucket.orderedDishes,
        delivery: state.bucket.delivery,
        settings: state.bucket.settings,
        global_settings: state.bucket.global_settings,
        cities: state.bucket.cities,
        address: selector(state, 'address'),
        paymentType: selector(state, 'payment_type'),
        deliveryType: selector(state, 'delivery_type')
    }
};

let mapDispatchToProps = (dispatch: any) => {
    return {
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