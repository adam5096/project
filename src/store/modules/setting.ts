// 小倉庫:關於layout元件相關配置倉庫
import { defineStore } from 'pinia'

const useLayOutSettingStore = defineStore('SettingStore' /*倉庫名字*/, {
  state: () => {
    return {
      fold: false, //使用者控制選單摺疊或開啟
      refsh: false, //本屬性用於控制刷新行為
    }
  },
})

export default useLayOutSettingStore
