export function emailValidate(value: string){
    return value.match(/[\w-]+@[\w-]+\.[a-z]{2,5}/);
}
export function passwordValidate(value: string){
    return value.match(/^[a-zA-z0-9]+$/);
}

export function onlyNumber(value: string) {
    let data = value.match(/[^0-9]/)

}

