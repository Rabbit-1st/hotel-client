import request from '@/utils/http'
import { result } from './common'

export interface image {
    imageId: string
    url: string
    class: string
    name: string
}


//请求类型
export interface mainImageForm {
    formData: FormData
}

export interface imageListForm {

}

export interface removeForm {
    name: string
}

export interface detailsForm {

}

//响应类型
export interface mainImageResponseData {

}

export interface imageListResponseData {

}

export interface removeResponseData {

}

export interface detailsResponseData {
    contact: string
    baseInfo: string
    intro: string
    edTime: string
    pets: string
    foreignInfo: string
    dietary: string
    parking: string
    network: string
    service: string
    electrification: string
}

//接口
export const mainImageAPI = ({ formData }: mainImageForm) => {
    return request<any, result<mainImageResponseData>>({
        url: '/hotel/image/upload',
        method: 'post',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data' // 指定请求头为 multipart/form-data
        }
    })
}

export const imageListAPI = () => {
    return request<any, result<image[]>>({
        url: '/hotel/image/list',
        method: 'get',

    })
}

export const removeImageAPI = ({ name }: removeForm) => {
    return request<any, result<removeResponseData>>({
        url: '/hotel/image/delete',
        method: 'post',
        data: {
            name
        }
    })
}

export const detialsAPI = () => {
    return request<any, result<detailsResponseData>>({
        url: '/hotel/hotelInfo',
        method: 'get',

    })
}