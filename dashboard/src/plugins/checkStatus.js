export function checkStatus ( status ) {
    if (status !== 200 || status !== 201) {
        console.log('Ошибка, возможно данный функционал находится в стадии разработки')
    } else {
        return true
    }
    return false
}
