import {categoryType} from "../types/types";

export function getCategoryNameById(categories: Array<categoryType>, id: number): string | undefined {
    let category = categories.find(category => category.id === id);
    return category ? category.title : undefined
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