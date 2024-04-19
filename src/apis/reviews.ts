import request from '@/utils/http'
import { page, result } from './common'

export interface reviews {
    reviewId: string
    userId: string
    rating: number
    reviewText: string
    createDate: Date
    firstname: string
    lastname: string

}


//请求类型
export interface reviewsListForm {
    current: number
    size: number
    order: string
    prop: string
    rating: number
}

export interface reviewsAddForm {
    userId: string
    rating: number
    reviewText: string
    createDate: Date

}



//响应类型
export interface reviewsListResponseData extends page<reviews> {

}

export interface reviewsAddResponseData {

}

//接口
export const reviewsListAPI = ({ current, size, order, prop, rating }: reviewsListForm) => {
    return request<any, result<reviewsListResponseData>>({
        url: '/reviews/list',
        method: 'get',
        params: {
            current,
            size,
            order,
            prop,
            rating
        }
    })
}

export const reviewsAddAPI = ({ userId,rating,reviewText,createDate }: reviewsAddForm) => {
    return request<any, result<reviewsAddResponseData>>({
        url: '/reviews/add',
        method: 'post',
        data: {
            userId,
            rating,
            reviewText,
            createDate
        }
    })
}





