import { addressType, orderDishType } from '../types/types'
import { serverUrl } from '../api/api'

export const isIos = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)

export const isNil = (item: Object | Array<any> | string | number | null | undefined) => {
  if (!item) return true
  if (typeof item === 'number' && !item && item !== 0) return true
  if (item instanceof Array && !item.length) return true

  return !Object.keys(item).length;
}

export function getTitleById( items: Array<any>, id: number ): string | undefined {
  const title = items.find(item => item.id === id)
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
  'Декабря',
]

export function tsToDate( timestamp: Date | number, type: string ): string {
  const date: Date = new Date(timestamp)
  const hh: number = date.getHours()
  const mm: number = date.getMinutes()
  let dd: number = date.getDate()
  dd = dd < 10 ? parseInt(`0${  dd}`, 10) : dd
  let MM: number = date.getMonth() + 1
  MM = (MM < 10 ? parseInt(`0${  MM}`, 10) : MM)
  const YYYY: number = date.getFullYear()
  const MMMM: string = arrMonth[date.getMonth()]

  switch (type) {
  case 'hh:mm dd MMMM YYYY':
    return `${hh  }:${  mm  } ${  dd  } ${  MMMM  } ${  YYYY}`
  case 'hh:mm dd:MM:YYYY':
    return `${hh  }:${  mm  } ${  dd  }:${  MM  }:${  YYYY}`
  case 'dd MMMM':
    return `${dd  } ${  MMMM}`
  default:
    return `${dd  }:${  MM  }:${  YYYY}`
  }
}

export function getDishesKey( dishes: Array<orderDishType>, id: number, key: string ): number {
  switch (key) {
  case 'count':
    return dishes.find(dish => dish.dishId === id)?.count as number
  case 'cost':
    return dishes.find(dish => dish.dishId === id)?.cost as number
  default:
    return -1
  }
}

export function cropText( text: string, limit = 100 ): string {
  if (text.length > limit) {
    return `${text.slice(0, limit)  }...`
  }
  return text
}

export function dateFormParse( date: Date | null ): number {
  return date ? Date.parse(date.toString()) : 0
}

export function toggleScroll( value: boolean ): void {
  if (value) {
    document.body.classList.remove('scroll_block')
  } else {
    document.body.classList.add('scroll_block')
  }
}

export function scrollHeight() {
  return Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight,
  )
}

export function fullLink( link: string ): string {
  return serverUrl + link.replace('\\', '/')
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isPunctuationMark( simbol: string ): boolean {
  const punctuationMarks = ['.', ';', '?', ',', '+', '-']
  punctuationMarks.forEach(mark => simbol === mark)
  return false

}

export function rangeNumbers(value: number, minValue: number, maxValue: number): number {
  const result = value

  if (value < minValue) return minValue
  if (value > maxValue) return maxValue

  return result
}

export function getFullName({ surname = '', forename = '', patronymic = '' }) {
  return `${surname}${forename ? ` ${  forename}` : ''}${patronymic ? ` ${  patronymic}` : ''}`
}

export function parseAddress(address: addressType) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { city, street, house, intercom, floor, flat } = address
  let parsedAddress = city

  if (street) parsedAddress += ` улица ${street}`
  if (house) parsedAddress += `, ${house}`

  return parsedAddress
}
