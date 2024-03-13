<template>
    <!-- 頂部左側靜態 -->
    <el-icon style="margin-right: 10px" @click="changeIcon">
        <component :is="LayOutSettingStore.fold?'Fold':'Expand'"></component>
        <!-- <Expand></Expand> -->
    </el-icon>
    <!-- 左側麵包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
        <!-- 麵包屑動態展示路由與標題 -->
        <!-- :to="item.path"開啟點擊麵包屑可以跳轉指定路由（展示指定元件） -->
        <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
            <!-- 圖標 -->
            <el-icon >
                <component :is="item.meta.icon"></component>
            </el-icon>
            <!-- 麵包屑展示對應路由的標題 -->
            <span >{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>
    
<script setup lang='ts'>
import { useRoute } from 'vue-router'
import useLayOutSettingStore from '@/store/modules/setting.ts'
// 取得layout配置相關的倉庫
let LayOutSettingStore = useLayOutSettingStore()
// 取得路由物件
let $route = useRoute()
// 點擊圖標方法
const changeIcon = () => {
    // 圖標進行切換
    LayOutSettingStore.fold = !LayOutSettingStore.fold
}

</script>
<script lang='ts'>
export default {
    name: 'Breadcrumb'
}
</script>    
<style></style>