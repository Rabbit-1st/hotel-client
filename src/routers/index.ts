import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/:pathMatch(.*)',
        meta: { title: 404 },
        component: () => import('@/pages/NotFound.vue')
    },
    {
        path: '/login',
        component: () => import('@/pages/Login.vue')
    },
    {
        path: '/register',
        component: () => import('@/pages/Register.vue')
    },
    {
        path: '/order',
        component: () => import('@/pages/Order.vue'),
        meta: {
            isAuth: true
        },
        children: [
            {
                path: 'book',
                component: () => import('@/components/order/BookPage.vue')
            },
            {
                path: 'list',
                component: () => import('@/components/order/OrderList.vue')
            },
        ]
    },

    {
        path: '/home',
        component: () => import('@/pages/Home.vue'),
        redirect: '/main',
        // meta:{
        //     isAuth:true
        // },

        children: [
            {
                path: '/main',
                name: '首页',
                component: () => import('@/components/main/Main.vue')
            }
        ]
    },


]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    console.log(to.meta.isAuth);

    if (to.meta.isAuth) {
        const userStore = useUserStore()
        if (userStore.userInfo.token) {
            next()
        } else {
            ElMessage.warning({
                message: '需要登录'
            })
            next('/login')


        }
    } else {
        next()
    }
})



export default router