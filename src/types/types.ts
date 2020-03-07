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

export type dish = {
    id: number,
    title: string,
    description: string | null,
    weight: number | null,
    price: number | null,
    category_id: number | null,
    url: string | null
}

export type category = {
    id: number,
    title: string
}