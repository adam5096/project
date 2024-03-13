// 品牌管理模組接口
import request from '@/utils/request'
import type { TradeMarkResponseData, TradeMark } from './type'
// 品牌管理模組接口地址
enum API {
  // 取得既有品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  // 新增品牌
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 修改已有品牌
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  // 刪除已有的品牌
  DELETE_URL = '/admin/product/baseTrademark/remove/{id}',
}
// 取得既有品牌的接口方法
// page:取得第?頁(的陣列) ---預設取得第1頁
// limit:取得?個既有品牌(的陣列)
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )

// 新增與修改已有品牌接口方法
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  // 如有data.id屬性，修改已有品牌數據
  if (data.id) {
    return request.put<any>(API.UPDATETRADEMARK_URL, data)
  } else {
    // 無data.id屬性，新增品牌數據
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}

// 刪除一個已有品牌的數據
export const reqDeleteTrademark = (id: number) =>
  request.delete<any, any>(API.DELETE_URL + id)
