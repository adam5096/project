// 定義用戶相關數據ts類型
// 用戶登入接口夾帶參數的類型
export interface loginFormData {
  username: string
  password: string
}

// 定義全部接口返回數據都具有的ts類型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 定義登入接口返回的數據類型
export interface loginResponseData extends ResponseData {
  data: string
}

// 定義取得用戶訊息後返回的數據類型
export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}

// =========================================================
// 測試接口數據類型
// export interface loginForm {
//     username: string,
//     password: string
// }
// interface dataType {
//     token: string
// }
// // 登錄接口返回數據類型
// export interface loginResponseData {
//     code: number,
//     data: dataType
// }
// interface userInfo {
//     userId:number ,
//     avatar:string,
//     username: string,
//     password: string,
//     desc: string ,
//     roles: string[],
//     buttons: string[],
//     routes: string[],
//     token: string,
// }

// // 定義伺服器返回用戶訊息相關數據類型
// interface user {
//     checkUser: userInfo,

// }
// // 伺服器反回用戶訊息相關數據類型
// export interface userResponseData {
//     code: number,
//     data: user
// }
