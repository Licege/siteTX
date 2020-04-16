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

export type reviewType = {
    id: number,
    name: string,
    phone: string,
    comment: string,
    create_at: number
}

export type fileType = {
    id: number
    url: string
}

export type dishType = {
    _id: string
    title: string
    description: string | null
    weight: number | null
    cost: number
    category_id: number | null
    count: number | null
    imageSrc: string | null
}

export type categoryType = {
    _id: string
    title: string
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
    surname: string
    phone: string
    datetime: string | Date
    count: string
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
    create_at: Date,
    short_description: string
    imageSrc: string
}

export type orderDishType = {
    dish_id: string,
    title: string,
    count: number,
    cost: number
}

export type deliveryType = {
    order: Array<orderDishType>,
    total_price: number
}

export type deliverySettingsType = {
    _id: string,
    city: string,
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
    create_at: Date,
    payment_status: number,
    count_person: number | null
    comment: string | null
    rule_agree: boolean
}

export type addressType = {
    city: string,
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
