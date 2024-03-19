<template>
    <!-- layout元件 選單展示邏輯 開始-->
    <template v-for="(item) in menuList" :key="item.path">
        <!-- v-if='!item.children -->
        <!-- 選項路由層級判斷 如果選項沒有子路由(只展示1級路由) -->
        <template v-if='!item.children'>
            <!-- v-if="!item.meta.hidden" -->
            <!-- 設定路由標題在登入成功後展示選單中是否隱藏 -->
            <el-menu-item v-if="!item.meta.hidden" :index="item.path" @click="goRoute">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <!-- #title功能是展示路由標題 -->
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <!-- v-if='item.children&& item.children.length==1' -->
        <!-- 選項路由層級判斷 如果選項 有且只有 1個子路由(展示2級路由) -->
        <template v-if='item.children && item.children.length == 1'>
            <el-menu-item :index="item.children[0].path" v-if="!item.children[0].meta.hidden" @click="goRoute">
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <!-- 選項路由層級判斷 如果選項 有2個或以上子路由,遞迴傳值元件寫法(子元件傳值給子元件自身) -->
        <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
            <template #title>
                <!-- 漏加累了嗎? -->
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <!-- 把父元件layout傳遞過來的全部路由陣列menuList，(遞迴傳值)從下面Menu元件標籤位置再次傳給Menu元件自身!! -->
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
    </template>
    <!-- layout元件 選單展示邏輯 結束-->
</template>
    
<script setup lang='ts'>
import { useRouter } from 'vue-router'
// 取得父元件layout傳遞過來的全部路由陣列
defineProps(['menuList'])
// 取得路由器物件(實例)
let $router = useRouter()
// 點擊選項後跳轉路由
const goRoute = (vc: any) => {
    // 路由跳轉
    $router.push(vc.index)
}
</script>

<script lang='ts'>
export default {
    // 以vue2元件命名語法為遞迴元件命名Menu後才能使用(否則會報錯誤)
    name: 'Menu'
}
</script>    
    
<style scoped lang="scss">

</style>