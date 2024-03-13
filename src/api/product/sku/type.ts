export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// 定義SKU物件的TS類型
export interface Attr {
  id?: number
  attrId: string | number //平台屬性ID
  valueId: string | number //屬性值ID
}
export interface saleArr {
  id?: number
  saleAttrId: string | number //屬性名稱ID
  saleAttrValueId: string | number //屬性值ID
}
export interface SkuData {
  category3Id?: string | number //三級分類ID
  spuId?: string | number //已有的SPU的ID
  tmId?: string | number //SPU品牌ID

  skuName?: string //sku的名稱
  price?: string | number //sku的價格
  weight?: string | number //sku的重量
  skuDesc?: string //sku的描述

  skuAttrValueList?: Attr[] //平台屬性蒐集
  skuSaleAttrValueList?: saleArr[] //銷售屬性

  skuDefaultImg?: string //sku圖片地址
  isSale?: number //控制商品的上、下架
  id?: number //
}
// 取得SKU返回數據的TS類型
export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuData[]
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
// 取得商品詳情接口的TS類型
export interface SkuInfoData extends ResponseData {
  data: SkuData
}
