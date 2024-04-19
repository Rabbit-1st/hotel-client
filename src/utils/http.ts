import axios from "axios"
import { useUserStore } from '@/stores/user'

import router from "@/routers"
import { ElMessage } from "element-plus"
const httpInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000
})



//axios请求拦截器
httpInstance.interceptors.request.use(config => {
    const userStore = useUserStore()
    const token = userStore.userInfo.token ?? ''
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, e => Promise.reject(e))

//axios响应拦截器
httpInstance.interceptors.response.use(res => {
    if(res.status === 401){
        ElMessage.warning('登录失效请重新登录')
        router.push('/login')
    }
    return res.data
}, e => {
    if(e.response.status === 401){
        ElMessage.warning('登录失效请重新登录')
        const userStore = useUserStore()
        userStore.logOut()
        router.push('/login')
    }
    return Promise.reject(e)
})

export default httpInstance