import { post, get } from "../zkhIndex/zkhIndex"

const BASE_URL = "copyright/"

const add = (data) => {
    return post(BASE_URL + 'add', data)
}


const edit = (data) => {
    return post(BASE_URL + 'edit', data)
}

const one = (params) => {
    return get(BASE_URL + 'one', params)
}

const page = (data) => {
    return post(BASE_URL + 'page', data)
}


export {
    edit,
    add,
    one,
    page,
}