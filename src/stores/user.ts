import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI, registerAPI } from '@/apis/user'
import type { user, loginForm, registerForm } from '@/apis/user'
import { ElMessage } from 'element-plus'
import router from '@/routers'



export const useUserStore = defineStore('user', () => {
    const userInfo = ref({} as user)


    const getUserInfo = async ({ phone, password }: loginForm) => {
        const res = await loginAPI({ phone, password })
        console.log(res)
        if (res.code === 200) {
            userInfo.value = res.data
            ElMessage.success({
                message: res.msg
            })
            router.push('/home')
        } else {
            ElMessage.warning({
                message: res.msg
            })
        }

    }

    const register = async ({ phone, password, lastname, firstname, email }: registerForm) => {
        const res = await registerAPI({ phone, password, lastname, firstname, email })
        console.log(res)
        if (res.code === 200) {
            userInfo.value = res.data
            ElMessage.success({
                message: res.msg
            })
            router.push('/home')
        } else {
            ElMessage.warning({
                message: res.msg
            })
        }
    }

    const logOut = () => {
        userInfo.value = {} as user
        ElMessage.success({
            message: '登出成功'
        })
        // router.push('/login')
    }

    return {
        userInfo,
        getUserInfo,
        register,
        logOut
    }
}, {
    persist: true
})