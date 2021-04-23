import React from 'react'
import { AppStateType } from '../../redux/redux-store'
import { connect } from 'react-redux'
import Bucket from '../../components/Bucket/Bucket'
import {
    addressType,
    categoryType,
    deliveryGlobalSettingsType,
    deliverySettingsType,
    deliveryType,
    dishType,
    IDeliveryPost, profileType,
} from '../../types/types'
import * as actions from '../../redux/reducers/bucket.reducer'
import { postOrder, requestDeliverySettings, requestGlobalDeliverySettings } from '../../redux/thunks/bucket.thunk'
// import { formValueSelector } from 'redux-form'
import { requestDishes, requestCategories } from '../../redux/thunks/menu.thunk'
import { WebSocketContext } from '../../socket/WebSocket'

type MapStatePropsType = {
    me: profileType
    menu: Array<dishType>
    dishes: Array<dishType>
    categories: Array<categoryType>
    delivery: deliveryType
    settings: Array<deliverySettingsType>
    globalSettings: deliveryGlobalSettingsType
    address: addressType
    paymentType: string
    deliveryType: string
    orderStatus: string
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
    removeDish: (id: number | string) => void
    clearBucket: () => void
    postOrder: (order: IDeliveryPost) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

type StateType = {
    deliveryPrice: number
    saleForPickup: number
    sale: number
    price: number
    step: 0 | 1 | 2
}

class BucketContainer extends React.Component<PropsType, StateType> {

    static contextType = WebSocketContext

    constructor(props: PropsType) {
        super(props)
        this.state = {
            deliveryPrice: this.priceForDelivery('Калининград', this.props.delivery.totalPrice),
            saleForPickup: 0,
            step: 0,
            sale: 0,
            price: this.props.delivery.totalPrice + this.priceForDelivery('Калининград', this.props.delivery.totalPrice),
        }
    }

    componentDidMount(): void {
        if (!this.props.settings.length) this.props.getSettings()
        if (!Object.keys(this.props.globalSettings).length) this.props.getGlobalSettings()
        if (!this.props.menu.length) this.props.getMenu()
        if (!this.props.categories.length) this.props.getCategories()
        document.title = 'Оформление заказа'
        window.scrollTo(0, 0)
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<StateType>): void {
        if (prevProps.globalSettings) {
            if (prevProps.deliveryType !== 'restaurant' && this.props.deliveryType === 'restaurant') {
                this.setState({ saleForPickup: this.props.globalSettings.saleForPickup })
            } else if (prevProps.deliveryType === 'restaurant' && this.props.deliveryType !== 'restaurant') {
                this.setState({ saleForPickup: 0 })
            }
        }
        if (prevProps.address && this.props.address && prevProps.delivery.totalPrice !== this.props.delivery.totalPrice) {
            this.setState({ deliveryPrice: this.priceForDelivery(this.props.address.city, this.props.delivery.totalPrice) })
        }
        if (prevProps.deliveryType && this.props.address && prevProps.deliveryType !== this.props.deliveryType) {
            this.setState({ deliveryPrice: this.priceForDelivery(this.props.address.city, this.props.delivery.totalPrice) })
        }
        if (this.props.address && this.props.address.city !== prevProps.address?.city) {
            this.setState({ deliveryPrice: this.priceForDelivery(this.props.address.city, this.props.delivery.totalPrice) })
        }
    }

    priceForDelivery = (city: string, price: number): number => {
        if (this.props.settings.length && this.props.deliveryType !== 'restaurant') {
            let settings = this.props.settings.find(s => s.city === city)
            if (settings) {
                return price < settings.freeDelivery ? settings.priceForDelivery : 0
            } else return 0
        } else return 0
    }

    onChange = (dish: dishType) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            let value = event.target.value
            if (value === '') value = '1'
            this.props.changeDishCount(dish, parseInt(value, 10))
        }
    }

    setStep = (step: 0 | 1 | 2) => {
        this.setState({ step }, () => {
            if (step !== 2) window.scrollBy(0, -500)
        })
    }

    isDisabled = (step: 0 | 1 | 2) => {
        if (this.state.step === 2 && (step === 0 || step === 1)) return true
        return this.state.step < step
    }

    onSubmit = (data: IDeliveryPost) => {
        let post = {
            ...data,
            list: this.props.delivery.order,
            deliveryCost: this.state.deliveryPrice,
            sale: this.state.saleForPickup,
            totalPrice: this.props.delivery.totalPrice,
            userId: this.props.me?.id || null,
        }
        this.setStep(2)
        this.context.sendOrderDelivery(post)
    }

    render() {
        let {
            me,
            dishes,
            menu,
            categories,
            delivery,
            orderStatus,
            settings,
            globalSettings,
            deliveryType,
            addDishToBucket,
            increaseDishCount,
            reduceDishCount,
            removeDish,
            paymentType,
            clearBucket,
        } = this.props
        let { step, saleForPickup, deliveryPrice, sale, price } = this.state

        return <Bucket dishes={dishes}
                       menu={menu}
                       categories={categories}
                       addDishToBucket={addDishToBucket}
                       delivery={delivery}
                       deliveryPrice={deliveryPrice}
                       orderStatus={orderStatus}
                       saleForPickup={saleForPickup}
                       increaseDishCount={increaseDishCount}
                       reduceDishCount={reduceDishCount}
                       removeDish={removeDish}
                       clearBucket={clearBucket}
                       settings={settings}
                       globalSettings={globalSettings}
                       paymentMethod={paymentType}
                       deliveryMethod={deliveryType}
                       step={step}
                       sale={sale}
                       price={price}
                       me={me}
                       onSubmit={this.onSubmit}
                       onChange={this.onChange}
                       setStep={this.setStep}
                       isDisabled={this.isDisabled}/>
    }
}

const mapStateToProps = (state: any) => {
    // const selector = formValueSelector('bucketOrderForm')
    return {
        me: state.profilePage.me,
        menu: state.menuPage.menu,
        categories: state.menuPage.categories,
        dishes: state.bucket.orderedDishes,
        delivery: state.bucket.delivery,
        settings: state.bucket.settings,
        globalSettings: state.bucket.globalSettings,
        isDeliveryPosted: state.bucket.isDeliveryPosted,
        orderStatus: state.bucket.statusOrder,
        // address: selector(state, 'address'),
        // paymentType: selector(state, 'paymentType'),
        // deliveryType: selector(state, 'deliveryType'),
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getSettings: () => {
            dispatch(requestDeliverySettings())
        },
        getGlobalSettings: () => {
            dispatch(requestGlobalDeliverySettings())
        },
        increaseDishCount: (dish: dishType) => {
            dispatch(actions.increaseDishCount(dish))
        },
        reduceDishCount: (dish: dishType) => {
            dispatch(actions.reduceDishCount(dish))
        },
        changeDishCount: (dish: dishType, count: number) => {
            dispatch(actions.changeDishCount({ dish, count }))
        },
        removeDish: (id: number | string) => {
            dispatch(actions.removeDish(id))
        },
        clearBucket: () => {
            dispatch(actions.clearBucket())
        },
        postOrder: (order: IDeliveryPost) => {
            dispatch(postOrder(order))
        },
        getMenu: () => {
            dispatch(requestDishes())
        },
        getCategories: () => {
            dispatch(requestCategories())
        },
        addDishToBucket: (dish: dishType) => {
            dispatch(actions.addDish(dish))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BucketContainer)
