export type authProfileType = {
    email: string
    password: string
}

export type profileType = {
    id: number | string
    email: string
    avatar: string
    surname?: string
    forename?: string
    patronymic?: string
    phone?: string
    birthday?: Date,
    address?: addressType,
    regDate: Date
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
    id: number | string
    title: string
    shortDescription: string
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
    id: number | string
    name: string
    phone: string
    comment: string
    createdAt: number
}

export type dishType = {
    id: number | string
    title: string
    description: string | null
    weight: number | null
    cost: number
    categoryId: number | string
    count: number | null,
    isDelivery: boolean,
    imageSrc: string
}

export type categoryType = {
    id: number | string
    title: string
    titleEn: string
    isDelivery: boolean
}

export type vacancyType = {
    id: number | string
    title: string
    requirements: string | null
    description: string | null
    salaryFrom: number | null
    salaryTo: number | null
    imageSrc: string | null
}

export type resumeType = {
    name: string
    surname: string
    patronymic: string
    education: string
    experience: string
    dateBirth: number
    address: string
    phone: string
    email: string
    vacancyId: number | string
    createdAt: number
}

export type imageForGalleryType = {
    original: string
    thumbnail: string
}

export interface IOrder {
    name: string
    phone: string
    orderDate: Date | string
    countPerson: number
    comment: string
}

export interface IReview {
    forename: string
    surname: string
    phone: string
    rating: number
    description: string
    ruleAgree: boolean
    createdAt: number
    status?: number
}

export type newsType = {
    id: number | string
    title: string
    description: string
    createdAt: Date
    shortDescription: string
    imageSrc: string
}

export type orderDishType = {
    dishId: number | string
    title: string
    count: number
    cost: number
}

export type deliveryType = {
    order: Array<orderDishType>
    totalPrice: number
}

export type deliverySettingsType = {
    id: number | string
    city: string
    priceForDelivery: number
    freeDelivery: number
    isDelivery: boolean
}

export interface IDeliveryPost {
    surname: string
    phone: string
    email: string | null
    paymentType: string
    oddMoney: number | null
    deliveryType: string
    address: addressType
    restaurantId: number | string
    timeDelivery: Date
    discountCard?: number
    createdAt: Date
    paymentStatus: number
    countPerson: number | null
    comment: string | null
    ruleAgree: boolean
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
    isDeliveryWorking: boolean
    phone: string
    saleForPickup: number
    paymentCash: boolean
    paymentCashless: boolean
    paymentOnline: boolean
}

export type RouteParams = {
    id: string
}

export enum ResultCodes {
    Success = 0,
    Error = 1
}

export type ResponseType = {
    data: any
    resultCode: ResultCodes
    messages: string[]
}

export type ordersListItemType = {
    dishId: string | number
    title: string
    count: number
    cost: number
}

export type ordersHistoryType = {
    id: string | number
    userId: string | number
    address: addressType
    comment: string | undefined
    countPerson: number
    deliveryCost: number
    deliveryType: 'home' | 'restaurant'
    email: string
    name: string
    phone: string
    oddMoney: number
    paymentStatus: number
    paymentType: 'cash' | 'cashless' | 'online'
    price: number
    sale: number
    status: number
    timeDelivery: string
    list: ordersListItemType[]
    createdAt: string
    updatedAt: string
}
