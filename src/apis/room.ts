import request from '@/utils/http'
import { page, result } from './common'

export interface room {
    roomId: string
    name: string
    bedType: number
    bedTypeText: string
    breakfast: number
    breakfastText: string
    wifi: number
    wifiText: string
    number: string
    price: number
    people: string
    policy: number
    policyText: string
    numberMax: string
    images: image[]
}

export interface image {
    id: string
    url: string
    class: string
}

//请求类型
export interface roomListForm {
    current: number
    size: number
    order: string
    prop: string
    bedType: number
    breakfast: number
    policy: number
    wifi: number
}

export interface getRoomInfoRorm{
    roomId:string
}


//响应类型
export interface roomListResponseData extends page<room> {

}

export interface getRoomInfoResponseData extends room{
    
}



//接口
export const roomListAPI = ({ current, size, order, prop, bedType, breakfast, policy, wifi }: roomListForm) => {
    return request<any, result<roomListResponseData>>({
        url: '/room/listClient',
        method: 'get',
        params: {
            current,
            size,
            order,
            prop,
            bedType,
            breakfast,
            policy,
            wifi
        }
    })
}

export const getRoomInfoAPI = ({ roomId }: getRoomInfoRorm) => {
    return request<any, result<getRoomInfoResponseData>>({
        url: '/room/getRoomInfo',
        method: 'get',
        params: {
            roomId
        }
    })
}
