// 商品分類全局元件小倉庫
import { defineStore } from 'pinia'
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import type { CategoryResponseData } from '@/api/product/attr/type'
import type { CategoryState } from './types/type'
const useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      //儲存一級分類數據
      c1Arr: [],
      // 儲存一級分類ID
      c1Id: '',
      // 存儲應對一級分類下的二級分類數據
      c2Arr: [],
      // 儲存二級分類ID
      c2Id: '',
      // 存儲應對二級分類下的三級分類數據
      c3Arr: [],
      // 儲存三級分類ID
      c3Id: '',
    }
  },
  actions: {
    // 取得一級分類數據方法
    async getC1() {
      // 發送請求取得一級分類數據
      const result: CategoryResponseData = await reqC1()
      if (result.code == 200) {
        this.c1Arr = result.data
      }
    },
    // 取得二級分類數據方法
    async getC2() {
      // 取得對應一級分類底下的二級分類的數據
      const result: CategoryResponseData = await reqC2(this.c1Id)
      if (result.code == 200) {
        this.c2Arr = result.data
      }
    },
    // 取得三級分類數據方法
    async getC3() {
      // 取得對應一級分類底下的二級分類的數據
      const result: CategoryResponseData = await reqC3(this.c2Id)
      if (result.code == 200) {
        this.c3Arr = result.data
      }
    },
  },
  getters: {},
})

export default useCategoryStore
