import pinia from '@/store'
import useUserStore from '@/store/modules/user'
const useStore = useUserStore(pinia)
export const isHasButton = (app: any) => {
  // 取得對應的用戶倉庫
  // 全域自定義指令
  app.directive('has', {
    // 使用這個全局自訂指令的DOM|元件掛載完畢時候會執行一次
    mounted(el: any, options: any) {
      // console.log('useStore.buttons', useStore.buttons);
      // 當前自定義指令右側數值:如果在用戶訊息buttons陣列當中沒有
      // 從DOM樹中幹掉
      if (!useStore.buttons.includes(options.value)) {
        // 從當前buttons的父節點把buttons自身幹掉
        el.parentNode.removeChild(el)
      }
    },
  })
}
