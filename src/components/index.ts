// 引入項目中全部的全局元件
import SvgIcon from './SvgIcon/index.vue'
import Pagination from './pagination/index.vue'
import Category from './Category/index.vue'
// 引入element-plus提供的全部圖標元件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// console.log('ElementPlusIconsVue', ElementPlusIconsVue);

const allGlobalComponent: any = { SvgIcon, Pagination, Category }

// console.log('Object.keys(allGlobalComponent)', Object.keys(allGlobalComponent));

// 對外暴露插件物件
export default {
  // 務必取名為install方法
  install(app: any) {
    // 註冊項目全部全局元件
    Object.keys(allGlobalComponent).forEach((key) => {
      // console.log('key', key);
      // 註冊為全局元件
      app.component(key, allGlobalComponent[key])
    })
    // 將element-plus提供圖標註冊為全局元件(全局註冊好處是註冊1次後，在所有元件檔案範圍內可以直接使用(省去繁複註冊))
    // console.log('Object.entries(ElementPlusIconsVue)', Object.entries(ElementPlusIconsVue));
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
