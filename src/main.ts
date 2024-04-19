import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/style/global.scss'
import 'element-plus/es/components/message/style/css'
import router from '@/routers'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import dayjs from "dayjs"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.config.globalProperties.$dayjs = dayjs
app.use(router).use(pinia).mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }