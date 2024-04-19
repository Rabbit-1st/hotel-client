import request from '@/utils/http'
import { result } from './common'

export interface user {
    id: string
    phone: string
    firstname: string
    lastname: string
    email: string
    password: string
    token: string
}



//请求类型
export interface loginForm {
    phone: string
    password: string
}

export interface registerForm {
    phone: string
    password: string
    lastname: string
    firstname: string
    email: string
}

//响应类型
export interface loginResponseData extends user {

}

export interface registerResponseData extends user {

}

//接口
export const loginAPI = ({ phone, password }: loginForm) => {
    return request<any, result<loginResponseData>>({
        url: '/user/login',
        method: 'POST',
        data: {
            phone,
            password
        }
    })
}

export const registerAPI = ({ phone, password, lastname, firstname, email }: registerForm) => {
    return request<any, result<registerResponseData>>({
        url: '/user/register',
        method: 'POST',
        data: {
            phone,
            password,
            lastname,
            firstname,
            email
        }
    })
}


