<template>
    <!-- 三級分類全局元件 -->
    <!-- Category -->
    <el-card>
        <el-form :inline="true">
            <el-form-item label="一級分類">
                <el-select :disabled="scene == 0 ? false : true" v-model="categoryStore.c1Id" @change="handler"
                    style="width:200px;">
                    <!-- :label即為展示數據 :value即為select下拉選單收集的數據-->
                    <el-option v-for="(c1) in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="二級分類">
                <el-select :disabled="scene == 0 ? false : true" v-model="categoryStore.c2Id" @change="handler1"
                    style="width:200px;">
                    <el-option v-for="(c2) in categoryStore.c2Arr" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="三級分類">
                <el-select :disabled="scene == 0 ? false : true" v-model="categoryStore.c3Id" style="width:200px;">
                    <el-option v-for="(c3) in categoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>
    
<script setup lang='ts'>
// 引入元件掛載完畢方法
import { onMounted } from 'vue'
// 引入分類相關倉庫
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()
// 分類全局元件掛載完畢，通知倉庫發請求 取得一級分類數據
onMounted(() => {
    getC1()
})
// 通知倉庫取得一級分類數據方法
const getC1 = () => {
    // 通知倉庫發請求 取得一級分類數據
    categoryStore.getC1()
}
// 此方法即為一級分類下拉選單的change事件(element-plus提供的事件)(選中值的時候會觸發，確保取得一級分類ID)
const handler = () => {
    // 需要將二級、三級分類的數據清空
    categoryStore.c2Id = ''
    categoryStore.c3Arr = []
    categoryStore.c3Id = ''

    // 通知倉庫取得二級分類的數據
    categoryStore.getC2()
}
// 此方法即為二級分類下拉選單的change事件(element-plus提供的事件)(選中值的時候會觸發，確保取得二級分類ID)
const handler1 = () => {
    // 需要將三級分類的數據清空
    categoryStore.c3Id = ''
    categoryStore.getC3()

}
// 接收父元件attr傳過來的場景變數值
defineProps(['scene'])
</script>
    
<style></style>