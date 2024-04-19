<template>
    <div class="navHeader">
        <div class="wrap">
            <RouterLink :to="{ path: '/home' }">
                <div class="logo">LOGO</div>
            </RouterLink>
            <el-dropdown>
                <p><router-link to="/order/list">查看订单</router-link></p>
                <template #dropdown>
                    <el-dropdown-menu v-if="userInfo.token">
                        <el-dropdown-item @click="handleLogOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
  
<script setup lang="ts">
// import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
// const router = useRouter()
const userInfo = userStore.userInfo



const handleLogOut = () => {
    userStore.logOut()

}
</script>
  
<style lang="scss" scoped>
.navHeader {
    width: 100%;
    background-color: #fff;
    box-shadow: 0 3px 5px rgba($color: #666, $alpha: .1);
    z-index: 10;
    position: fixed;
    top:0;
    .wrap {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .logo {
            width: 100px;
            height: 64px;
            background-size: 60%;
            background-position: 50% 50%;
            background-repeat: no-repeat;
            font-size: 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
}
</style>