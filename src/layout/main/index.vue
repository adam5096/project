<template>
  <!-- 路由元件出口位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染1級路由元件的子路由 -->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>
    
<script setup lang='ts'>
import { watch, ref, nextTick } from 'vue'
import useLayOutSettingStore from '@/store/modules/setting.ts'
let layOutSettingStore = useLayOutSettingStore()

// 控制當前元件是否銷毀、重建
let flag = ref(true)
// 監聽倉庫內部數據是否發生變化，說明使用者點擊過刷新按鈕
watch(() => layOutSettingStore.refsh, () => {
  // 點擊刷新按鈕，路由元件銷毀
  flag.value = false
  // nextTick在響應式數據變化後，取得更新後的DOM
  nextTick(() => {
    flag.value = true
  })
})
</script>

<script lang="ts">
export default {
  name: 'Main'
}
</script>
    
<style scoped >
.fade-enter-from {
  opacity: 0;
  /* transform:rotate(0deg); */
  transform: scale(0);
}

.fade-enter-active {
  transition: all .3s;
}

.fade-enter-to {
  opacity: 1;
  /* transform:rotate(360deg); */
  transform: scale(1);

}
</style>