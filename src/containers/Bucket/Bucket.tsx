import React from 'react';
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import Bucket from "../../components/Bucket/Bucket";
import {
    addressType, categoryType,
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
    removeDishAC,
    requestDeliverySettings, requestGlobalDeliverySettings, postOrder, addDishAC
} from "../../redux/bucket-reducer";
import {formValueSelector} from "redux-form";
import {getCategories, getMenu} from "../../redux/menu-reducer";

type MapStatePropsType = {
    menu: Array<dishType>
    dishes: Array<dishType>
    categories: Array<categoryType>
    delivery: deliveryType
    settings: Array<deliverySettingsType>
    global_settings: deliveryGlobalSettingsType
    address: addressType
    paymentType: string
    deliveryType: string
}
type MapDispatchPropsType = {
    getSettings: () => void
    getMenu: () => void
    getCategories: () => void
    addDishToBucket: (dish: dishType) => void
    getGlobalSettings: () => void
    increaseDishCount: (dish: dishType) => void
    reduceDishCount: (dish: dishType) => void
    changeDishCount: (dish: dishType, count: number) => void
    removeDish: (id: string) => void
    clearBucket: () => void
    postOrder: (order: IDeliveryPost) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

type StateType = {
    deliveryPrice: number
    saleForPickup: number
    orderPrice: number
    step: 0 | 1 | 2
}

class BucketContainer extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props)
        this.state = {
            deliveryPrice: this.priceForDelivery('Калининград', this.props.delivery.total_price),
            saleForPickup: 0,
            orderPrice: this.props.delivery.total_price,
            step: 0
        }
    }

    componentDidMount(): void {
        if (!this.props.settings.length) this.props.getSettings()
        if (!Object.keys(this.props.global_settings).length) this.props.getGlobalSettings()
        if (!this.props.menu.length) this.props.getMenu()
        if (!this.props.categories.length) this.props.getCategories()
    }

    componentDidUpdate(prevProps: Readonly<MapStatePropsType & MapDispatchPropsType>, prevState: Readonly<StateType>): void {
        if (prevProps.global_settings) {
            if (prevProps.deliveryType !== 'restaurant' && this.props.deliveryType === 'restaurant') {
                this.setState({saleForPickup: this.props.global_settings.sale_for_pickup})
            } else if (prevProps.deliveryType === 'restaurant' && this.props.deliveryType !== 'restaurant') {
                this.setState({saleForPickup: 0})
            }
        }
        if (prevProps.address && this.props.address && prevProps.delivery.total_price !== this.props.delivery.total_price) {
            this.setState({deliveryPrice: this.priceForDelivery(this.props.address.city, this.props.delivery.total_price)})
            this.setState({orderPrice: this.props.delivery.total_price})
        }
        if (prevProps.deliveryType && this.props.address && prevProps.deliveryType !== this.props.deliveryType) {
            this.setState({deliveryPrice: this.priceForDelivery(this.props.address.city, this.props.delivery.total_price)})
        }
        if (prevProps.address && this.props.address && this.props.address.city !== prevProps.address.city) {
            this.setState({deliveryPrice: this.priceForDelivery(this.props.address.city, this.props.delivery.total_price)})
        }
    }

    priceForDelivery = (city: string, price: number): number => {
        console.log(this.props.deliveryType === 'restaurant')
        if (this.props.settings.length && this.props.deliveryType !== 'restaurant') {
            let settings = this.props.settings.find(s => s.city === city)!
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

    setStep = (step: 0 | 1 | 2) => {
        this.setState({step}, () => console.log('step ' + this.state.step))
    }

    isDisabled = (step: 0 | 1| 2) => {
        console.log('this ' +this.state.step)
        console.log('step ' +step)
        console.log(this.state.step < step)
        console.log(' ')
        if (this.state.step === 2 && step === 0 || step === 1) return true
        return this.state.step < step

    }

    onSubmit = (data: IDeliveryPost) => {
        let post = {...data,
            list: this.props.delivery.order,
            delivery_cost: this.state.deliveryPrice,
            sale: this.state.saleForPickup,
            total_price: this.props.delivery.total_price
        }
        this.setStep(2)
        this.props.postOrder(post)
    }

    render() {
        let {
            dishes,
            menu,
            categories,
            delivery,
            settings,
            global_settings,
            deliveryType,
            addDishToBucket,
            increaseDishCount,
            reduceDishCount,
            removeDish,
            paymentType,
            clearBucket} = this.props
        let {step, saleForPickup, deliveryPrice, orderPrice} = this.state

        return <Bucket dishes={dishes}
                       menu={menu}
                       categories={categories}
                       addDishToBucket={addDishToBucket}
                       delivery={delivery}
                       deliveryPrice={deliveryPrice}
                       orderPrice={orderPrice}
                       saleForPickup={saleForPickup}
                       increaseDishCount={increaseDishCount}
                       reduceDishCount={reduceDishCount}
                       removeDish={removeDish}
                       clearBucket={clearBucket}
                       settings={settings}
                       global_settings={global_settings}
                       paymentMethod={paymentType}
                       deliveryMethod={deliveryType}
                       step={step}
                       onSubmit={this.onSubmit}
                       onChange={this.onChange}
                       setStep={this.setStep}
                       isDisabled={this.isDisabled} />
    }
}

let mapStateToProps = (state : AppStateType) => {
    const selector = formValueSelector('bucketOrderForm');
    return {
        menu: state.menuPage.menu,
        categories: state.menuPage.categories,
        dishes: state.bucket.orderedDishes,
        delivery: state.bucket.delivery,
        settings: state.bucket.settings,
        global_settings: state.bucket.global_settings,
        isDeliveryPosted: state.bucket.isDeliveryPosted,
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
        removeDish: (id: string) => {
            dispatch(removeDishAC(id))
        },
        clearBucket: () => {
            dispatch(clearBucketAC())
        },
        postOrder: (order: IDeliveryPost) => {
            dispatch(postOrder(order))
        },
        getMenu: () => {
            dispatch(getMenu())
        },
        getCategories: () => {
            dispatch(getCategories())
        },
        addDishToBucket: (dish: dishType) => {
            dispatch(addDishAC(dish))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (BucketContainer);