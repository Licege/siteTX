import bucketReducer, { actions as bucketActions, InitialState } from '../../../redux/bucket-reducer'
import { dishType } from '../../../types/types'

let state: InitialState

beforeEach(() => {
    state = {
        delivery: {
            order: [
                {
                    dish_id: 'd1',
                    title: 'D1',
                    count: 2,
                    cost: 250,
                },
            ],
            total_price: 500,
        },
        settings: [
            {
                _id: 's1',
                city: 'S1',
                price_for_delivery: 200,
                free_delivery: 600,
                is_delivery: true,
            },
            {
                _id: 's2',
                city: 'S2',
                price_for_delivery: 300,
                free_delivery: 900,
                is_delivery: true,
            },
        ],
        global_settings: {
            is_delivery_working: true,
            phone_for_sms: '89997123456',
            sale_for_pickup: 500,
            payment_type_cash: true,
            payment_type_cashless: true,
            payment_type_online: false,
        },
        orderedDishes: [
            {
                _id: 'd1',
                title: 'D1',
                description: 'description D1',
                weight: 200,
                cost: 125,
                category_id: 'salad',
                count: 2,
                is_delivery: true,
                imageSrc: 'image',
            },
        ],
        deliveryPrice: 0,
        isDeliveryPosted: false,
        statusOrder: '',
    }
})

test('Test bucket-reducer', () => {
    const newDish = {
        _id: 'd1',
        title: 'D1',
        description: 'description D1',
        weight: 200,
        cost: 125,
        category_id: 'salad',
        count: 1,
        is_delivery: true,
        imageSrc: 'image',
    } as dishType
    const newState = bucketReducer(state, bucketActions.addDish(newDish))

    expect(newState.delivery.total_price).toBe(state.delivery.total_price + newDish.cost)
})
