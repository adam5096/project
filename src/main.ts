import { createApp } from 'vue'
import App from '@/App.vue'
// import './style.css'
// 引入模板的全局樣式
import '@/styles/index.scss'
// 引入element-plus插件與樣式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// svg插件需要的配置代碼
import 'virtual:svg-icons-register'
//引入自訂義插件物件 :註冊整個項目全局物件
import globalComponent from '@/components/'
// 配置element-plus國際化
// import zhTw from 'element-plus/dist/locale/zh-tw.mjs'
// 暗黑模式需要的樣式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 引入路由
import router from './router'
// 引入倉庫
import pinia from './store'
// 取得應用的實例物件
// createApp(App).mount('#app')
const app = createApp(App)
// 安裝element-plus插件
app.use(ElementPlus, {
  // locale: zhTw, //element-plus國際化配置
})

// 測試代碼:測試假接口能否使用
// import axios from 'axios';
// // 登錄接口
// axios({
//     url: '/api/user/login',
//     method: 'post',
//     data: {
//         username: 'admin',
//         password: '111111',
//     }
// })
// 安裝自訂義插件
app.use(globalComponent)
// 安裝倉庫
app.use(pinia)
// 註冊模板路由
app.use(router)
// 引入路由鑒權(鑒別權限)
import './permission'
// 引入自定義指令文件
import { isHasButton } from '@/directive/has'
isHasButton(app)
// 將應用掛載到掛載點上
app.mount('#app')
