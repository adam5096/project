// 路由鑒權，項目當中的路由能否被訪問的權限設置(某路由在某條件下可以訪問，某條件下不能訪問)
import router from '@/router/'
import setting from './setting'
import nprogress from 'nprogress'
// 引入進度條樣式
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
// 取得使用者相關的小倉庫內部token數據,去判斷使用者是否登入成功
import useUserStore from './store/modules/user'
import pinia from './store'
const userStore = useUserStore(pinia)

// 全局守衛:項目當中任意路由切換都會觸發的生命週期函數
// 全局前置守衛
router.beforeEach(async (to: any, _: any, next: any) => {
  document.title = `${setting.title} - ${to.meta.title} `
  // 訪問某一路由之前會觸發的一生命週期函數
  nprogress.start()
  // 取得token,去判斷使用者登入?還是未登入
  const token = userStore.token
  // 取得用戶名字
  const username = userStore.username
  // 使用者登入判斷
  if (token) {
    // 登入成功,訪問login,不能訪問，指向首頁
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      // 登入成功訪問其餘6個路由
      // 有用戶訊息
      if (username) {
        // 放行
        next()
      } else {
        // 如果沒有用戶訊息，在守衛這裡發送請求取得用戶訊息後，再放行
        try {
          // 取得用戶訊息後
          await userStore.uerInfo()
          // 放行
          // 萬一:刷新的時候是異步路由，有可能取得用戶訊息，異步路由還沒有加載完畢，出現空白效果
          next({ ...to })
        } catch (error) {
          // token過期階段:取得不了用戶訊息
          // 用戶人為修改本地存儲token
          // 退出後台-->清空用戶相關數據
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    // 使用者未登入判斷
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
// 全局後置守衛
router.afterEach(() => {
  nprogress.done()
})

// 第一個問題:任意路由切換時實現進度條邏輯 ---nprogress

// 第二個問題:路由鑒權(路由元件的訪問權限設置)
// 全部路由元件:登入|404|任意|首頁|數據大屏|權限管理(3個子路由)|商品管理(4個子路由)

// 使用者未登入:可以訪問login,其餘6個路由禁止訪問(指向login)
// 登入成功:禁止訪問login(指向首頁),其餘路由可以訪問
