import { serverUrl } from '../api/api'

export function getPositionsNameById( positions, id ) {
    return positions.find(position => position.id === id).name
}

export function getTitleById( arr, id ) {
    return arr.find(item => item.id === id).title
}

const arrMonth = [
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
    'Декабря',
]

export function tsToDate( timestamp, type ) {
    let date = new Date(timestamp)
    let hh = date.getHours()
    hh = hh < 10 ? '0' + hh : hh
    let mm = date.getMinutes()
    mm = mm < 10 ? '0' + mm : mm
    let dd = date.getDate()
    dd = dd < 10 ? '0' + dd : dd
    let MM = date.getMonth() + 1
    MM = MM < 10 ? '0' + MM : MM
    let YYYY = date.getFullYear()
    let MMMM = arrMonth[date.getMonth()]

    switch (type) {
        case 'hh:mm dd MMMM YYYY':
            return hh + ':' + mm + ' ' + dd + ' ' + MMMM + ' ' + YYYY
        case 'hh:mm dd:MM:YYYY':
            return hh + ':' + mm + ' ' + dd + ':' + MM + ':' + YYYY
        case 'dd MMMM':
            return dd + ' ' + MMMM
        default:
            return dd + ':' + MM + ':' + YYYY
    }
}

// export function toDate(date, type) {
//     let data = new Date(date)
//     let hh = date.getHours(); hh = hh < 10 ? '0' + hh : hh
//     let mm = date.getMinutes(); mm = mm < 10 ? '0' + mm : mm
//     let dd = date.getDate(); dd = dd < 10 ? '0'+ dd : dd
//     let MM = date.getMonth() + 1; MM = MM < 10 ? '0' + MM : MM
//     let YYYY = date.getFullYear()
//     let MMMM = arrMonth[date.getMonth()]
//
//     console.log(data.getHours())
//     return date
// }

export function cropText( text = '', limit = 100 ) {
    console.log(text);
    return text.length > limit ? text.slice(0, limit) + '...' : text
}

export function fullLink( link ) {
    return link ? serverUrl + link.replace('\\', '/') : ''
}

export function checkStatus( type, data, status, params = null ) {
    switch (status) {
        case 200:
        case 201:
            return { type: type + '_SUCCESS', data, ...params }
        case 400:
            return { type: '_BAD_REQUEST', data, ...params }
        case 401:
            return { type: 'LOGOUT' }
        case 404:
            return { type: type + '_NOT_FOUND', data, ...params }
        case 422:
            return { type: type + '_VALIDATION_ERROR', data, ...params }
        default:
            return { type: type + '_ERROR', data, ...params }
    }
}

export function getFullName({ surname = '', forename = '', patronymic = '' }) {
    return `${surname}${forename ? ` ${forename}` : ''}${patronymic ? ` ${patronymic}` : ''}`
}

export function toRub(number) {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(number)
}

