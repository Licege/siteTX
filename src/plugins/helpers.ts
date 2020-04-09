import {orderDishType} from "../types/types";

export const isIos = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

export function getTitleById(items: Array<any>, id: number): string | undefined {
    let title = items.find(item => item.id === id);
    return title ? title.title : undefined
}

const arrMonth: Array<string> = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря'
];

export function tsToDate (timestamp: number, type: string): string {
    let date: Date = new Date(timestamp);
    let hh: number = date.getHours();
    let mm: number = date.getMinutes();
    let dd: number = date.getDate(); dd = dd < 10 ? parseInt('0'+ dd, 10) : dd;
    let MM: number = date.getMonth() + 1; MM = (MM < 10 ? parseInt('0' + MM, 10) : MM);
    let YYYY: number = date.getFullYear();
    let MMMM: string = arrMonth[date.getMonth()];

    switch (type) {
        case "hh:mm dd MMMM YYYY":
            return hh + ':' + mm + ' ' + dd + ' ' + MMMM + ' ' + YYYY;
        case "hh:mm dd:MM:YYYY":
            return hh + ':' + mm + ' ' + dd + ':' + MM + ':' + YYYY;
        case "dd MMMM":
            return dd + ' ' + MMMM;
        default:
            return dd + ':' + MM + ':' + YYYY;
    }
}

export function getDishesKey(dishes: Array<orderDishType>, id: number, key: string): number {
    switch (key) {
        case 'count':
            return dishes.find(dish => dish.id === id)?.count as number
        case 'price':
            return dishes.find(dish => dish.id === id)?.price as number
        default:
            return -1
    }
}

export function cropText(text: string, limit = 100): string {
    if (text.length > limit) {
        text = text.slice(0, limit) + '...'
    }
    return text
}

export function dateFormParse(date: Date | null): number {
    return date ? Date.parse(date.toString()) : 0
}

export function toggleScroll(value: boolean): void {
    value ? document.body.classList.remove('scroll_block') : document.body.classList.add('scroll_block')
}

export function scrollHeight() {
    return Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    )
}