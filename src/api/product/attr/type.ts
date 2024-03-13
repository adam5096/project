// 分類相關的數據TS類型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 分類相關的數據TS類型
export interface CategoryObj {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}

// 對應的分類接口返回數據類型
export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}
// 屬性值與屬性值的ts類型

// 屬性值物件的ts類型
// 新增屬性時，帶問號?的屬性不存在(故發送請求時不夾帶該參數)
// 修改屬性時，帶問號?的屬性已經存在(故發送請求時要夾帶該參數)
export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
  flag?: boolean
}

// 存儲每一個屬性值的陣列類型
export type AttrValueList = AttrValue[]
//  屬性物件
export interface Attr {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValueList
}
// 存儲每一個屬性物件的陣列ts類型
export type AttrList = Attr[]
// 屬性接口返回的數據類型
export interface AttrResponseData extends ResponseData {
  data: Attr[]
}
