// SKu模組接口管理
import request from '@/utils/request'
import type { SkuResponseData, SkuInfoData } from './type'
// 列舉地址
enum API {
  // 取得已有SKU商品數據
  SKU_URL = '/admin/product/list/',
  // 商品上架接口
  SALE_URL = '/admin/product/onSale/',
  // 商品下架接口
  CANCELSALE_URL = '/admin/product/cancelSale/',
  // 取得商品詳情接口
  SKUINFO_URL = '/admin/product/getSkuInfo/',
  // 刪除已有商品
  DELETESKU_URL = '/admin/product/deleteSku/',
}
// 取得已有SKU商品數據
export const reqSkuList = (page: number, limit: number) =>
  request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)
// 商品上架接口
export const reqSaleSku = (skuId: number) =>
  request.get<any, any>(API.SALE_URL + skuId)
// 商品下架接口
export const reqCancelSale = (skuId: number) =>
  request.get<any, any>(API.CANCELSALE_URL + skuId)
// 取得商品詳情接口
export const reqSkuInfo = (skuId: number) =>
  request.get<any, SkuInfoData>(API.SKUINFO_URL + skuId)
// 刪除已有商品
export const reqRemoveSku = (skuId: number) =>
  request.delete<any>(API.DELETESKU_URL + skuId)
