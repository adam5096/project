// 統一管理項目中與用戶相關的接口
import request from '@/utils/request'
import { loginFormData, loginResponseData, userInfoResponseData } from './type'
// 項目用戶相關請求地址
enum API {
  // LOGIN_URL = '/user/login',
  LOGIN_URL = '/admin/acl/index/login',
  // USERINFO_URL = '/user/info',
  USERINFO_URL = '/admin/acl/index/info',
  // LOGOUT_URL = '/admin/acl/index/logout'
  LOGOUT_URL = '/admin/acl/index/logout',
}

// 登入接口
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
// 取得用戶訊息接口
export const reqUserInfo = () =>
  request.get<any, userInfoResponseData>(API.USERINFO_URL)
// 退出後台
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)

// =======================================================
// 測試數據

// 統一管理項目中與用戶相關的接口
// import request from '@/utils/request'
// import { loginForm, loginResponseData, userResponseData } from './type'
// // 項目用戶相關請求地址
// enum API {
//     LOGIN_URL = '/user/login',
//     // LOGIN_URL = '/admin/acl/index/login',
//     USERINFO_URL = '/user/info',
//     // USERINFO_URL = '/admin/acl/index/info',
//     // LOGOUT_URL = '/admin/acl/index/logout'
//     LOGOUT_URL = '/admin/acl/index/logout'
// }

// // 登入接口
// export const reqLogin = (data: loginForm) => request.post<any, loginResponseData>(API.LOGIN_URL, data)
// // 取得用戶訊息接口
// export const reqUserInfo = () => request.get<any, userResponseData>(API.USERINFO_URL)
// // 退出後台
// // export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
