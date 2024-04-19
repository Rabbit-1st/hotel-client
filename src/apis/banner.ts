import request from '@/utils/http'
import { result } from './common'

export interface image {
    imageId: string
    url: string
    class: string
    name: string
}

//请求类型
export interface imageListForm {

}

//响应类型
export interface imageListResponseData {

}

//接口
export const imageListAPI = () => {
    return request<any, result<image[]>>({
        url: '/hotel/image/list',
        method: 'get',

    })
}