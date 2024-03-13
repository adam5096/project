// 職位管理模組街口
import request from '@/utils/request'
import type { RoleResponseData, RoleData, MenuResponseData } from './type'
enum API {
  // 取得全部職位接口
  ALLROLE_URL = '/admin/acl/role/',
  // 新增職位接口地址
  ADDROLE_URL = '/admin/acl/role/save',
  // 修改已有職位
  UPDATEROLE_URL = '/admin/acl/role/update',
  // 取得全部選單與按鈕數據
  ALLPERMISSION_URL = '/admin/acl/permission/toAssign/',
  // 給對應職位分配權限
  SETPERMISSION_URL = '/admin/acl/permission/doAssign/?',
  // 刪除已有職位
  REMOVEROLE_URL = '/admin/acl/role/remove/',
}
// 取得全部職位接口
export const reqAllRoleList = (page: number, limit: number, roleName: string) =>
  request.get<any, RoleResponseData>(
    API.ALLROLE_URL + `${page}/${limit}/?roleName=${roleName}`,
  )
// 新增職位接口地址 與 修改已有職位
export const reqAddOrUpdateRole = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEROLE_URL, data)
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data)
  }
}
// 取得全部選單與按鈕數據
export const reqAllMenuList = (roleId: number) =>
  request.get<any, MenuResponseData>(API.ALLPERMISSION_URL + roleId)
// 給對應職位分配權限
export const reqSetPermission = (roleId: number, permissionId: number[]) =>
  request.post<any, any>(
    API.SETPERMISSION_URL + `roleId=${roleId}&permissionId=${permissionId}`,
  )
// 刪除已有職位
export const reqRemoveRole = (roleId: number) =>
  request.delete<any, any>(API.REMOVEROLE_URL + roleId)
