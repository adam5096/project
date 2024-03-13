<template>
    <div>
        <!-- 三級分類結構 -->
        <category :scene="scene"></category>
        <el-card style="margin: 10px 0px;">
            <div v-show="scene == 0">
                <el-button @click="addSpu" type="primary" size="default" icon="Plus"
                    :disabled="categoryStore.c3Id ? false : true">新增SPU</el-button>
                <!-- 展示已有的SPU數據 -->
                <el-table style="margin: 10px 0px;" border stripe :data="records">
                    <el-table-column label="序" type="index" align="center" width="80px"></el-table-column>
                    <el-table-column label="SPU名稱" prop="spuName"></el-table-column>
                    <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作">
                        <!-- row即為已有的SPU物件records -->
                        <template #="{ row }">
                            <el-button type="primary" size="small" icon="Plus" title="新增SKU" plain
                                @click="addSku(row)"></el-button>
                            <el-button type="warning" size="small" icon="Edit" title="修改SKU" @click="updateSpu(row)"
                                plain></el-button>
                            <el-button type="primary" size="small" icon="Search" title="查看SKU" @click="findSku(row)"
                                plain></el-button>

                            <el-popconfirm :title="`確定刪除${row.spuName}?`" width="200px" @confirm="deleteSpu(row)">
                                <template #reference>
                                    <el-button type="danger" size="small" icon="Delete" title="刪除SKU" plain></el-button>
                                </template>
                            </el-popconfirm>


                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分頁器 -->
                <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 40]"
                    :background="true" layout=" prev, pager, next, jumper,->, sizes,total," :total="total"
                    @current-change="getHasSpu" @size-change="changeSize" />

            </div>
            <!-- 新增SPU、修改SPU子元件 -->
            <SpuForm ref="spu" v-show="scene == 1" @changeScene="changeScene"></SpuForm>
            <!-- 新增SKU、修改SPU子元件 -->
            <SkuForm ref="sku" v-show="scene == 2" @changeScene="changeScene"></SkuForm>
            <!-- dialog對話框:展示已有SKU數據 -->
            <el-dialog v-model="show" title="SKU列表">
                <el-table border :data="skuArr">
                    <el-table-column label="SKU名稱" prop="skuName"></el-table-column>
                    <el-table-column label="SKU價格" prop="price"></el-table-column>
                    <el-table-column label="SKU重量" prop="weight"></el-table-column>
                    <el-table-column label="SKU圖片">
                        <template #="{ row}">
                            <img :src="row.skuDefaultImg" style="width:100px;height:100px">
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </el-card>
    </div>
</template>
    
<script setup lang='ts'>
import type { HasSpuResponseData, Records, SkuInfoData, SkuData } from "@/api/product/spu/type";
import { ref, watch, onBeforeUnmount } from 'vue'
import { reqHasSpu, reqSkuList, reqRemoveSpu } from '@/api/product/spu'
import type { SpuData } from '@/api/product/spu/type'
// 引入子元件SpuForm,SkuForm
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
// 引入分類倉庫
import useCategoryStore from '@/store/modules/category'
import { ElMessage } from "element-plus";
let categoryStore = useCategoryStore()
// 場景數值
let scene = ref<number>(0)//0:顯示現有SPU 1:新增或修改現有SPU內容 2:新增SPU結構
// 分頁器預設頁碼
let pageNo = ref<number>(1)
// 每一頁展示幾條數據
let pageSize = ref<number>(3)
// 存儲 操作當前頁 已有SPU數據
let records = ref<Records>([])
// 存放已有SPU總個數
let total = ref<number>(0)
// 取得子元件SpuForm的元件實例
let spu = ref<any>()
// 取得子元件SkuForm的元件實例
let sku = ref<any>()
// 存儲全部的SKU數據
let skuArr = ref<SkuData[]>([])
let show = ref<boolean>(false)
// 監聽三級分類ID變化
watch(() => categoryStore.c3Id, () => {
    // 務必保證有三級分類ID
    // c3Id沒有值，直接結束watch函數流程
    if (!categoryStore.c3Id) return
    getHasSpu()
})
// 此方法執行:可取得特定三級分類下全部的已有的SPU
const getHasSpu = async (pager = 1) => {
    // 修改當前頁碼
    pageNo.value = pager
    let result: HasSpuResponseData = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3Id)
    // console.log('result', result);

    if (result.code == 200) {
        records.value = result.data.records
        total.value = result.data.total
    }
}
// 分頁器的下拉選單發生變化(如每頁顯示資料筆數變化)
const changeSize = () => {
    getHasSpu()
}
// 新增SPU按鈕 方法
const addSpu = () => {
    // 切換為場景1 新增與修改現有SPU結構->SpuForm
    scene.value = 1
    // 點擊新增SPU按鈕,呼叫子元件的方法初始化數據
    spu.value.initAddSpu(categoryStore.c3Id)
}
// 修改現有SPU 方法
const updateSpu = (row: SpuData) => {
    // 切換為場景1 新增與修改現有SPU結構->SpuForm
    scene.value = 1
    // console.log(spu.value);
    // 呼叫子元件實例 的方法 取得完整現存SPU數據
    spu.value.initHasSpuData(row)
}
// 子元件SpuForm綁定的自訂義事件:目前需求是讓子元件SpuForm通知父元件spu切換場景
const changeScene = (obj: any) => {
    // console.log('obj',obj);

    // 子元件點擊取消 變為場景0 展示現有SPU
    scene.value = obj.flag
    if (obj.params == 'update') {
        // 點擊 更新 後,畫面回到當前頁
        getHasSpu(pageNo.value)
    } else {
        // 點擊 新增 後,畫面留在第1頁
        getHasSpu()
    }

}
// 點擊新增SKU按鈕
const addSku = (row: SpuData) => {
    // 點擊新增SKU按鈕切換場景為2
    scene.value = 2
    // console.log('row', row);
    // 呼叫子元件方法初始化新增SKU的數據
    sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
}
// 查看SKU列表數據
const findSku = async (row: SpuData) => {
    let result: SkuInfoData = await reqSkuList((row.id as number))
    //    console.log('result', result);
    if (result.code == 200) {
        skuArr.value = result.data
        // 對話框出現到畫面上
        show.value = true
    }

}
// 點擊刪除已有SPU按鈕
const deleteSpu = async (row: SpuData) => {
    let result: any = await reqRemoveSpu((row.id as number))
    // console.log('result', result);
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '刪除 成功'
        })
        // 點擊刪除鍵後 取得剩餘全部SPU數據
        // 刪除後，如當前頁有剩餘SPU數據則畫面停留在當前頁，否則畫面回到前一頁
        getHasSpu(records.value.length > 1 ? pageNo.value : pageNo.value - 1)
    } else {
        ElMessage({
            type: 'error',
            message: '刪除 失敗'
        })
    }

}
// 每次路由元件銷毀前 清空倉庫中關於各級分類(一級、二級、三級)的數據
onBeforeUnmount(() => {
    categoryStore.$reset()
})
</script>
    
<style></style>