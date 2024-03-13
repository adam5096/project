import request from '@/utils/request'
import type { PermissionResponseData } from './type'
enum API {
  // 取得全部選單與按鈕標記數據
  ALLPERMISSION_URL = '/admin/acl/permission',
  // 給某一級選單新增一個子選單
  ADDMENU_URL = '/admin/acl/permission/save',
  // 修改某個已有選單
  UPDATE_URL = '/admin/acl/permission/update',
  // 刪除一個已有選單
  DELETE_URL = '/admin/acl/permission/remove/',
}
// 取得全部選單與按鈕標記數據
export const reqAllPermission = () =>
  request.get<any, PermissionResponseData>(API.ALLPERMISSION_URL)
// 給某一級選單新增一個子選單
export const reqAddOrUpdateMenu = (data: any) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_URL, data)
  } else {
    return request.post<any, any>(API.ADDMENU_URL, data)
  }
}
// 刪除一個已有選單
export const reqRemoveMenu = (id: number) =>
  request.delete<any, any>(API.DELETE_URL + id)
