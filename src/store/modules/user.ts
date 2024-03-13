// 創建用戶相關的小倉庫
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type'
import { UserState } from './types/type'
// 引入操作本地存儲的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 引入路由(常量路由,異步路由,任意路由)
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes'
// 引入深拷貝方法
// @ts-expect-error
// @typescript-eslint/ban-ts-comment:
import cloneDeep from 'lodash/cloneDeep'

import router from '@/router'

// 從asyncRoute中比對挑出 允許讓當前帳號訪問的路由名單routes(由伺服器回傳) 使用陣列方法filter逐個元素比對
// asyncRoute 專案中全部的異步路由
// routes 伺服器回傳當前用戶所允許訪問的路由名單,
function filterAsyncRoute(asyncRoute: any, routes: any) {
  // 從asyncRoute中比對 允許讓當前帳號訪問的路由名單routes
  // item相當於asyncRoute陣列中的每一元素(物件)
  return asyncRoute.filter((item: any) => {
    // 如routes陣列的元素命中asyncRoute中的任一元素(物件)
    if (routes.includes(item.name)) {
      // 如當前1級路由存在子路由屬性名稱children(元素陣列),且children內有存放資料(陣列長度大於0),繼續往內層比對
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }

      return true //將比對符合條件的路由挑選出來留下
    }
  })
}
// 創建用戶小倉庫
const useUserStore = defineStore('User', {
  // 小倉庫存儲數據地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用戶唯一標記token
      menuRoutes: constantRoute, //倉庫存儲生成選單需要陣列(路由)
      username: '',
      avatar: '',
      buttons: [],
    }
  },
  // 處理異步、邏輯的地方
  actions: {
    // 用戶登入方法
    async userLogin(data: loginFormData) {
      // 登入請求
      const result: loginResponseData = await reqLogin(data)

      // 登入請求:成功200=>token
      // 登入請求:失敗201=>登入失敗錯誤訊息
      if (result.code === 200) {
        // pinia倉庫存儲一下token
        // 由於pinia與vuex存儲數據其實利用js物件
        this.token = result.data as string
        // 本地存儲永久存儲1份
        SET_TOKEN(result.data as string)
        // 能保證當前async函數返回一個成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    // 取得用戶訊息方法
    async uerInfo() {
      // 發送請求 待伺服器返回數據後 取得使用者訊息進行存儲於倉庫當中
      const result: userInfoResponseData = await reqUserInfo()
      // console.log('result.data.routes',result.data.routes);

      // 如果取得使用者訊息成功，儲存使用者訊息
      if (result.code == 200) {
        this.username = result.data.name //儲存登入用戶名稱
        this.avatar = result.data.avatar //儲存登入用戶頭像動畫
        this.buttons = result.data.buttons //儲存登入用戶授權按鈕種類
        // 根據不同登入帳號配發不同路由權限:過濾出異步路由並展示
        const userAsyncRoute = filterAsyncRoute(
          cloneDeep(asyncRoute),
          result.data.routes,
        )
        // 畫面左側展示的選單數據(目前路由器管理的只有常量路由)
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute]
        // 動態追加異步路由、任意路由
        ;[...userAsyncRoute, anyRoute].forEach((route: any) => {
          router.addRoute(route)
        })
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 退出平台
    async userLogout() {
      // 退出後台請求
      const result: any = await reqLogout()
      if (result.code === 200) {
        // 目前沒有mock接口(通知伺服器本次使用者唯一標記失效(註銷))
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})
// 對外暴露取得小倉庫的方法
export default useUserStore
