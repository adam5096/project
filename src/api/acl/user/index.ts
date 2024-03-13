// 用戶管理模組接口
import request from '@/utils/request'
import type {
  UserResponseData,
  User,
  AllRoleResponseData,
  SetRoledata,
} from './type'

// 列舉地址
enum API {
  // 取得全部已有使用者帳號訊息
  ALLUSER_URL = '/admin/acl/user/',
  // 新增一個新使用者帳號
  ADDUSER_URL = '/admin/acl/user/save',
  // 更新已有的使用者帳號
  UPDATEUSER_URL = '/admin/acl/user/update',
  // 取得全部職位 當前帳號所擁有職位
  ALLROLE_URL = '/admin/acl/user/toAssign/',
  // 給已有用戶分配對應角色接口
  SETROLE_URL = '/admin/acl/user/doAssignRole',
  // 刪除 某個 帳號(一次刪除一個)
  DELETEUSER_URL = '/admin/acl/user/remove/',
  // 刪除 多個 帳號(刪除 一群已勾選)
  DELETEALLUSER_URL = '/admin/acl/user/batchRemove',
}
// 取得全部已有使用者帳號訊息
export const reqUserInfo = (page: number, limit: number, username: string) =>
  request.get<any, UserResponseData>(
    API.ALLUSER_URL + `${page}/${limit}/?username=${username}`,
  )
// 新增一個新使用者帳號 更新已有的使用者帳號
export const reqAddOrUpdateUser = (data: User) => {
  // 攜帶參數中 含有ID>更新
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data)
  }
}
// 取得全部職位 當前帳號所擁有職位
export const reqAllRole = (userId: number) =>
  request.get<any, AllRoleResponseData>(API.ALLROLE_URL + userId)
// 給已有用戶分配對應角色接口
export const reqSetUserRole = (data: SetRoledata) =>
  request.post(API.SETROLE_URL, data)
// 刪除某個帳號(一次刪除一個)
export const reqRemoveUser = (userId: number) =>
  request.delete<any, any>(API.DELETEUSER_URL + userId)
// 刪除 多個 帳號(刪除 一群已勾選)
export const reqSelectUser = (idList: number[]) =>
  request.delete<any, any>(API.DELETEALLUSER_URL, { data: idList })
