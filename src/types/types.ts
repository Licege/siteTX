export type authProfileType = {
    email: string
    password: string
}

export type authRegProfileType = {
    email: string
    password: string
    surname?: string
    forename: string
    patronymic?: string
    phone: string

}

export type authTokenType = {
    accessToken: string
    refreshToken: string
}

export type promoType = {
    _id: string
    title: string
    short_description: string
    description: string
    status: number
    show: boolean
    imageSrc: string
}

export type contactsType = {
    phone: string
    address: string
    vk: string
    fb: string
    tg: string
    inst: string
    google: string
    tw: string
    openHours: [string]
}

export type reviewType = {
    id: number
    name: string
    phone: string
    comment: string
    create_at: number
}

export type dishType = {
    _id: string
    title: string
    description: string | null
    weight: number | null
    cost: number
    category_id: string
    count: number | null,
    is_delivery: boolean,
    imageSrc: string
}

export type categoryType = {
    _id: string
    title: string
    title_en: string
}

export type vacancyType = {
    _id: string
    title: string
    requirements: string | null
    description: string | null
    salary_from: number | null
    salary_to: number | null
    imageSrc: string | null
}

export type resumeType = {
    name: string
    surname: string
    patronymic: string
    education: string
    experience: string
    date_birth: number
    address: string
    phone: string
    email: string
    vacancy_id: number
    create_at: number
}

export type imageForGalleryType = {
    original: string
    thumbnail: string
}

export interface IOrder {
    name: string
    phone: string
    order_date: Date | string
    count_person: number
    comment: string
}

export interface IReview {
    forename: string
    surname: string
    phone: string
    rating: number
    description: string
    rule_agree: boolean
    create_at: number
    status?: number
}

export type newsType = {
    _id: string
    title: string
    description: string
    create_at: Date
    short_description: string
    imageSrc: string
}

export type orderDishType = {
    dish_id: string
    title: string
    count: number
    cost: number
}

export type deliveryType = {
    order: Array<orderDishType>
    total_price: number
}

export type deliverySettingsType = {
    _id: string
    city: string
    price_for_delivery: number
    free_delivery: number
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
    time_delivery: Date
    discount_card?: number
    create_at: Date
    payment_status: number
    count_person: number | null
    comment: string | null
    rule_agree: boolean
}

export type addressType = {
    city: string
    street?: string
    house?: string
    flat?: string | undefined
    intercom?: string | undefined
    floor?: string | undefined
}

export type deliveryGlobalSettingsType = {
    is_delivery_working: boolean
    phone_for_sms: string
    sale_for_pickup: number
    payment_type_cash: boolean
    payment_type_cashless: boolean
    payment_type_online: boolean
}

export type RouteParams = {
    id: string,
}

export enum ResultCodes {
    Success = 0,
    Error = 1
}

export type ResponseType = {
    data: any,
    resultCode: ResultCodes,
    messages: string[],
}
