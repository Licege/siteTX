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
    price: number | null,
    category_id: number | null,
    url: string | null
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
    id: number,
    label: string,
    content: string,
    create_at: string,
    url: string | null
}

export type newsType = {
    id: number,
    label: string,
    content: string,
    create_at: number,
    url: string | null
}