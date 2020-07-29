import { scroller } from 'react-scroll/modules'

export function emailValidate( value: string ) {
    return value.match(/[\w-]+@[\w-]+\.[a-z]{2,5}/)
}

export function passwordValidate( value: string ) {
    return value.match(/^[a-zA-z0-9]+$/)
}

export function scrollToFirstError( errors: any ) {
    const errorFields = getErrorFieldNames(errors)

    scroller.scrollTo(errorFields[0], {
        offset: -200,
        smooth: true,
        delay: 100,
        duration: 700,
    })
}

function getErrorFieldNames( obj: any, name = '' ) {
    const errorArr = []
    errorArr.push(Object.keys(obj).map(( key ) => {
        const next = obj[key]
        if (next) {
            if (typeof next === 'string') {
                return name + key
            }
            if (next.map) {
                errorArr.push(next
                    .map(( item: any, index: Number ) => getErrorFieldNames(item, `${name}${key}[${index}].`))
                    .filter(( o: any ) => o))
            }
        }
        return null
    }).filter(( o: any ) => o))
    return flatten(errorArr)
}

function flatten( arr: any ) {
    return arr.reduce(( flat: any, toFlatten: any ) => flat.concat(Array.isArray(toFlatten)
        ? flatten(toFlatten)
        : toFlatten), [])
}



