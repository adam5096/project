// 伺服器全部接口返回的數據類型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// SPU接口返回的數據結構最內層
// 現存SPU數據ts類型,將來修改
export interface SpuData {
  // 點擊新增時無id值,修改、刪除有id值
  category3Id: string | number
  id?: number //SPU物件ID[新增SPU不需攜帶]
  spuName: string //SPU名字
  // 點擊 新增SPU後 出現SPU品牌ID下拉選單，每個品牌有專屬對應的tmID
  tmId: number | string //品牌ID
  description: string //SPU描述
  // 照片牆數據
  spuImageList: null | SpuImg[]
  // 銷售屬性數據
  spuSaleAttrList: null | SaleAttr[]
}
// 陣列:元素都是已有的SPU數據類型
export type Records = SpuData[]
// 定義取得已有SPU接口返回的數據  的ts類型,Response Body層
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records
    // 現存SPU總數
    total: number
    // 當前頁SPU數量
    size: number
    // 當前第幾頁
    current: number
    //
    searchCount: boolean
    // 總共幾頁
    pages: number
  }
}
// 品牌數據的TS類型
export interface Trademark {
  id: number
  tmName: string
  logoUrl: string
}
// 品牌接口 返回的數據ts類型
export interface AllTradeMark extends ResponseData {
  data: Trademark[]
}
// 商品圖片的ts類型
export interface SpuImg {
  id?: number
  imgName?: string
  imgUrl?: string
  createTime?: string
  updateTime?: string
  spuId?: number
  name?: string
  url?: string
}
// 已有的SPU的照片牆數據的類型
export interface SpuHasImg extends ResponseData {
  data: SpuImg[]
}
// 已有的銷售屬性值 物件ts類型
export interface SaleAttrValue {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  // 選色
  saleAttrValueName: string
  // 顏色
  saleAttrName?: string
  isChecked?: null
}
// 存放已有銷售屬性值物件 類型
export type SpuSaleAttrValueList = SaleAttrValue[]
// 銷售屬性名 物件ts類型
export interface SaleAttr {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  // 顏色
  saleAttrName: string
  spuSaleAttrValueList: SpuSaleAttrValueList
  flag?: boolean
  saleAttrValue?: string
}
// SPU已有銷售屬性接口 返回的數據ts類型
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}
// 已有的全部SPU的返回數據ts類型
export interface HasSaleAttr {
  id: number
  name: string
}
export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[]
}

export interface Attr {
  attrId: string | number //平台屬性ID
  valueId: string | number //屬性值ID
}
export interface saleArr {
  saleAttrId: string | number //屬性名稱ID
  saleAttrValueId: string | number //屬性值ID
}
export interface SkuData {
  category3Id: string | number //三級分類ID
  spuId: string | number //已有的SPU的ID
  tmId: string | number //SPU品牌ID

  skuName: string //sku的名稱
  price: string | number //sku的價格
  weight: string | number //sku的重量
  skuDesc: string //sku的描述

  skuAttrValueList?: Attr[] //平台屬性蒐集
  skuSaleAttrValueList?: saleArr[] //銷售屬性

  skuDefaultImg: string //sku圖片地址
}
// 取得sku數據接口ts類型
export interface SkuInfoData extends ResponseData {
  data: SkuData[]
}
