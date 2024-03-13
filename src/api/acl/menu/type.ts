// 數據類型定義(result.data以外,對應的其他三個屬性名、值)
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// 選單數據與按鈕數據TS類型(結構單元包)
export interface Permission {
  id?: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: null
  toCode: null
  type: number
  status: null
  level: number
  children?: PermissionList
  select: boolean
}
// 選單接口返回的數據類型後拆包結構(對應result.data)
export type PermissionList = Permission[]
// 選單接口返回的數據類型(結構最大包)(對應result)
export interface PermissionResponseData extends ResponseData {
  data: PermissionList
}
// 新增與修改選單攜帶的參數TS類型
export interface MenuParams {
  id?: number //ID
  code: string //權限數值
  level: number //第幾級選單
  name: string //選單名字
  pid: number //已有數據對應的選單ID
}
