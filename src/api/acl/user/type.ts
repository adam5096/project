// 帳號訊息TS類型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// 代表一個帳號訊息TS類型
export interface User {
  id?: number
  createTime?: string
  updateTime?: string
  username?: string
  password?: string
  name?: string
  phone?: null
  roleName?: string
}
// 陣列包含全部的使用者訊息
export type Records = User[]
// 陣列包含全部的使用者訊息接口 返回的數據TS類型
export interface UserResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    pages: number
  }
}
// 代表一個職位的TS類型
export interface RoleData {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark: null
}
// 全部職位列表 allRolesList
export type AllRole = RoleData[]
// 取得全部職位的接口返回的數據TS類型
export interface AllRoleResponseData extends ResponseData {
  data: {
    assignRoles: AllRole
    allRolesList: AllRole
  }
}
// 給用戶分配職位接口攜帶參數TS類型
export interface SetRoledata {
  roleIdList: number[]
  userId: number
}
