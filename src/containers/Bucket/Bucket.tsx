import React from 'react';
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import Bucket from "../../components/Bucket/Bucket";
import {cityType, deliveryGlobalSettingsType, deliverySettingsType, deliveryType, dishType} from "../../types/types";
import {
    changeDishCountAC,
    clearBucketAC,
    increaseDishCountAC,
    reduceDishCountAC,
    removeDishAC, requestCities,
    requestDeliverySettings, requestGlobalDeliverySettings
} from "../../redux/bucket-reducer";
import {formValueSelector} from "redux-form";
import {getMenu} from "../../redux/menu-reducer";

export interface DeliverySubmitType {
    surname: string
    phone: string
    email: string | null
    payment_method: string
    odd_money: string | null
    delivery_method: string
    street: string
    house: string
    flat: string | null
    intercom: string | null
    floor: string | null
    //datetime: Date
    count_person: string | null
    comment: string | null
    rule: boolean
}

type addressType = {
    city: number,
    street: string
    house: string
    flat: string | null
    intercom: string | null
    floor: string | null
}

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
}
type PropsType = MapStatePropsType & MapDispatchPropsType

type StateType = {
    test_payment_method: string
    test_delivery_method: string
    deliveryPrice: number
    totalPrice: number
}

class BucketContainer extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props)
        this.state = {
            test_payment_method: 'cash',
            test_delivery_method: 'home',
            deliveryPrice: this.priceForDelivery(undefined, this.props.delivery.totalPrice),
            totalPrice: this.priceForDelivery(undefined, this.props.delivery.totalPrice) + this.props.delivery.totalPrice
        }
    }

    componentDidMount(): void {
        if (!this.props.settings.length) this.props.getSettings();
        if (!Object.keys(this.props.global_settings).length) this.props.getGlobalSettings();
        if (!this.props.cities.length) this.props.getCities();
        if (!this.props.dishes.length) this.props.getDishes();
    }
/*
    componentDidUpdate(prevProps: Readonly<MapStatePropsType & MapDispatchPropsType>, prevState: Readonly<StateType>, snapshot?: any): void {
        if (this.props.address && prevProps.address) {
            if (prevProps.address.city !== this.props.address.city) {
                this.setState({deliveryPrice: this.priceForDelivery(this.props.address.city, this.props.delivery.totalPrice)})
                this.setState({totalPrice: this.state.deliveryPrice + this.props.delivery.totalPrice})
            }
            if (prevState.totalPrice !== this.props.delivery.totalPrice) {
                this.setState({totalPrice: this.props.delivery.totalPrice + this.state.deliveryPrice})
            }

        }
        console.log(prevState)
        console.log(prevProps)
    }*/

    componentWillUnmount(): void {
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

    onSubmit(data: DeliverySubmitType) {
        console.log(data);
    }

    render() {
        let test_payment_method = 'cash';
        let test_delivery_method = 'home';
        console.log(this.state.totalPrice)

        return <Bucket dishes={this.props.dishes}
                       delivery={this.props.delivery}
                       increaseDishCount={this.props.increaseDishCount}
                       reduceDishCount={this.props.reduceDishCount}
                       removeDish={this.props.removeDish}
                       clearBucket={this.props.clearBucket}
                       priceForDelivery={this.priceForDelivery}
                       settings={this.props.settings}
                       global_settings={this.props.global_settings}
                       cities={this.props.cities}
                       paymentMethod={test_payment_method}
                       deliveryMethod={test_delivery_method}
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
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (BucketContainer);