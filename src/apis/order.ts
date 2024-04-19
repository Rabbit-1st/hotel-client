import request from '@/utils/http'
import { page, result } from './common'

export interface order {
    orderId: string
    userId: string
    hotelId: string
    roomName: string
    status: number
    statusText: string
    bedType:number
    bedTypeText:string
    policy:number
    policyText:string
    totalPrice:number
    createDate: Date
    createDateText: string
    checkInDate: Date
    checkInDateText: string
    checkOutDate: Date
    checkOutDateText: string
    cancelDate: Date
    cancelDateText: string
    firstname: string
    lastname: string
    phone: String
}


//请求类型
export interface orderListForm {
    current: number
    size: number
    order: string
    prop: string
    status: number
    phone: string
    userId:string
}

export interface orderUpdateForm {
    orderId: string
    status: string

}

export interface orderAddForm {
    userId: string
    roomType: string
    status: number
    checkInDate: number
    checkOutDate: number
}


//响应类型
export interface orderListResponseData extends page<order> {

}

export interface orderUpdateResponseData {

}

export interface orderAddResponseData {

}

//接口
export const orderListAPI = ({ current, size, order, prop, status, phone,userId }: orderListForm) => {
    return request<any, result<orderListResponseData>>({
        url: '/order/listByUser',
        method: 'get',
        params: {
            current,
            size,
            order,
            prop,
            status,
            phone,
            userId
        }
    })
}

export const orderUpdateAPI = ({ orderId, status }: orderUpdateForm) => {
    return request<any, result<orderListResponseData>>({
        url: '/order/update',
        method: 'post',
        data: {
            orderId,
            status
        }
    })
}

export const orderAddAPI = ({ userId: string, roomType, status, checkInDate, checkOutDate }: orderAddForm) => {
    return request<any, result<orderAddResponseData>>({
        url: '/order/add',
        method: 'post',
        data: {
            userId: string, roomType, status, checkInDate, checkOutDate
        }
    })
}



