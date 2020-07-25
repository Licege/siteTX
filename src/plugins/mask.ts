export function phoneMask(next: string = '', prev: string = '') {
    // if (typeof next != 'string' || typeof prev != 'string') return ''
    if (prev.length === 18 && prev.length <= next.length) return prev
    let str = '',
        nextPhone = removePhoneMask(next),
        prevPhone = removePhoneMask(prev),
        arr = ((next === prev.slice(0, -1)) && (nextPhone === prevPhone)
                ? nextPhone.slice(0, -1).slice(-10).split('')
                : nextPhone.slice(-10).split('')
        ),
        nextLength = next.length,
        isRemove = false

    if (arr.length > 1 && (isNumeric(arr[0] || !isNumeric(arr[1])))) return prev

    arr.forEach((val, i) => {
        switch (true) {
            case i === 0 && !isRemove:
            case i === 0 && nextLength > 4 && isRemove:
                if (val === '7') {
                    str += '+' + val + ' ('
                } else if (val === '8') {
                    str = '+7 ('
                } else {
                    str += '+7 (' + val
                }
                break
            case i == 2 && !isRemove:
            case i === 2 && nextLength > 9 && isRemove:
                str += val + ') '
                break
            case i === 5 && !isRemove:
            case i === 7 && !isRemove:
            case i === 5 && nextLength > 13 && isRemove:
            case i === 7 && nextLength > 16 && isRemove:
                str += val + '-'
                break
            default:
                str += val;
                break
        }
    })

    return str.slice(0, 18)
}

export function removePhoneMask(str: string) {
    if (str.indexOf('+7 (') === 0) {
        return str.substr(3).replace(/\s|\W/gi, '')
    }
    return str
}

export function isNumeric(n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n)
}
