export type contactsType = {
    phone: string | null,
    address: string | null,
    vk: string | null,
    fb: string | null,
    tg: string | null,
    inst: string | null,
    google: string | null,
    tw: string | null
}

export type dishType = {
    id: number,
    title: string,
    description: string | null,
    weight: number | null,
    price: number,
    category_id: number | null,
    url: string | null,
    count: number | null
}

export type categoryType = {
    id: number,
    title: string,
    title_en: string
}

export type vacancyType = {
    id: number,
    title: string,
    requirements: string | null,
    description: string | null,
    salary_from: number | null,
    salary_to: number | null,
    url: string | null
}

export type imageForGalleryType = {
    original: string,
    thumbnail: string
}

export type orderType = {
    name: string,
    phone: string,
    date: number,
    count: number,
    comment: string,
    create_at: number
}

export type newsType = {
    id: number,
    label: string,
    content: string,
    create_at: number,
    url: string | null
}
/*
export type deliveryType = {
    id: bigint,
    name: string,
    phone: string,
    email: string | null,
    payment_type: number,
    delivery_type: number,
    cash_change: number | null,
    address: addressType | null,
    restaurant_id: number | null,
    time_delivery: bigint,
    count_person: number,
    discount_card: number | null,
    comment: string | null,
    dishes: ordersDishType
}
 */

export type orderDishType = {
    id: number,
    count: number,
    price: number
}

export type deliveryType = {
    order: Array<orderDishType>,
    total_price: number
}

export type deliverySettingsType = {
    city_id: number,
    price_for_delivery: number,
    free_delivery: number,
    is_delivery: boolean
}

export interface IDeliveryPost {
    surname: string
    phone: string
    email: string | null
    payment_type: string
    odd_money: number | null
    delivery_type: string
    address: addressType
    restaurant_id: number
    time_delivery: number
    discount_card?: number
    create_at: number,
    payment_status: number,
    count_person: number | null
    comment: string | null
    rule_agree: boolean
}

export type addressType = {
    city: number,
    street?: string
    house?: string
    flat?: string | undefined
    intercom?: string | undefined
    floor?: string | undefined
}

export type deliveryGlobalSettingsType = {
    is_delivery_working: boolean,
    phone_for_sms: string
}

export type cityType = {
    id: number,
    title: string
}