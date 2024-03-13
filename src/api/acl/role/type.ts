export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// 單個職位數據類型
export interface RoleData {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: null
}
// 全部職位陣列 TS 類型
export type Records = RoleData[]
// 全部職位數據響應的 TS 類型
export interface RoleResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}
// 選單與按鈕數據TS類型
export interface MenuData {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: null
  level: number
  children?: MenuList
  select: boolean
}
export type MenuList = MenuData[]
// 伺服器返回的選單權限與按鈕權限數據的TS類型
export interface MenuResponseData extends ResponseData {
  data: MenuList
}
