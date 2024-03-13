// 通過vue-router插件實現路由模板配置
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes'
// 創建路由器
const router = createRouter({
  // 路由模式hash
  history: createWebHashHistory(),
  routes: constantRoute,
  // 滾動行為
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
