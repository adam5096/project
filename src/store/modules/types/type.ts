import { RouteRecordRaw } from 'vue-router'
import type { CategoryObj } from '@/api/product/attr/type'
// 定義小倉庫數據state類型
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
  buttons: string[] // 存儲當前用戶是否包含某按鈕權限
}

// 定義分類倉庫state物件的ts類型
export interface CategoryState {
  c1Id: string | number
  c1Arr: CategoryObj[]
  c2Arr: CategoryObj[]
  c2Id: string | number
  c3Arr: CategoryObj[]
  c3Id: string | number
}
