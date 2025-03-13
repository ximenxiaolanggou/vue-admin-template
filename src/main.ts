import { createApp } from 'vue'


// element plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'virtual:svg-icons-register'
import gloablComponent from './components/index';
import '@/styles/index.scss'

//引入路由
import router from './router'
import pinia from '@/store'

import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus, {
    locale: zhCn
})

app.use(gloablComponent);

//注册模板路由
app.use(router)
app.use(pinia)

app.mount('#app')

