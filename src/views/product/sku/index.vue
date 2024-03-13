<template>
    <el-card>
        <el-table border style="margin: 10px 0px;" :data="skuArr">
            <el-table-column label="序號" type="index" align="center" width="80px"></el-table-column>
            <el-table-column label="名稱" show-overflow-tooltip width="150px" prop="skuName"></el-table-column>
            <el-table-column label="描述" show-overflow-tooltip width="150px" prop="skuDesc"></el-table-column>
            <el-table-column label="圖片" width="150px">
                <!-- 此位置row保存內容(屬性名-值)相當於(對應關係)祖先元素el-table中:data="skuArr"所存內容，故操作row邏輯等同於操作skuArr邏輯 -->
                <template #="{ row }">
                    <img :src="row.skuDefaultImg" style="width: 100px;height: 100px;">
                </template>
            </el-table-column>
            <el-table-column label="重量(g)" width="150px" prop="weight"></el-table-column>
            <el-table-column label="價格" width="150px" prop="price"></el-table-column>
            <el-table-column label="操作" width="250px" fixed="right">
                <template #="{ row }">
                    <el-button type="success" size="small" :icon="row.isSale == 1 ? 'Bottom' : 'Top'" plain
                        @click="updateSale(row)"></el-button>
                    <el-button type="warning" size="small" icon="Edit" plain @click="updateSku"></el-button>
                    <el-button type="primary" size="small" icon="InfoFilled" plain @click="findSku(row)"></el-button>
                    <el-popconfirm :title="`確定刪除 ${row.skuName}?`" width="200px" @confirm="removeSku(row.id)">
                        <template #reference>
                            <el-button type="danger" size="small" icon="Delete" plain></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
            :background="true" layout=" prev, pager, next, jumper,->,total, sizes" :total="total"
            @current-change="getHasSku" @size-change="handler" />
        <!-- 抽屜元件 展示商品詳情 -->

        <el-drawer v-model="drawer" >
            <!-- 標題 -->
            <template #header>
                <h4>set title by slot</h4>
            </template>
            <template #default>
                <el-row style="margin: 10px 0px;">
                    <el-col :span="6">名稱</el-col>
                    <el-col :span="18">{{ skuInfo.skuName }}</el-col>
                </el-row>
                <el-row style="margin: 10px 0px;">
                    <el-col :span="6">描述</el-col>
                    <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
                </el-row>
                <el-row style="margin: 10px 0px;">
                    <el-col :span="6">價格</el-col>
                    <el-col :span="18">{{ skuInfo.price }}</el-col>
                </el-row>
                <el-row style="margin: 10px 0px;">
                    <el-col :span="6">平台屬性</el-col>
                    <el-col :span="18">
                        <el-tag style="margin: 5px;" v-for="(item) in skuInfo.skuAttrValueList" :key="item.id">{{
                            item.valueName }}</el-tag>
                    </el-col>
                </el-row>
                <el-row style="margin: 10px 0px;">
                    <el-col :span="6">銷售屬性</el-col>
                    <el-col :span="18">
                        <el-tag style="margin: 5px;" v-for="(item) in skuInfo.skuSaleAttrValueList" :key="item.id">{{
                            item.saleAttrValueName }}</el-tag>
                    </el-col>
                </el-row>
                <el-row style="margin: 10px 0px;">
                    <el-col :span="6">商品圖片</el-col>
                    <el-col :span="18">
                        <el-carousel :interval="4000" type="card" height="200px" indicator-position="outside">
                            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                                <!-- skuInfo.skuImageList -->
                                <img :src="item.imgUrl" alt="圖片" style="width:100%;height:100%">
                            </el-carousel-item>
                        </el-carousel>
                    </el-col>
                </el-row>
            </template>
        </el-drawer>
    </el-card>
</template>
    
<script setup lang='ts'>
import { ref, onMounted } from 'vue'
// 引入發送請求方法
import { reqSkuList, reqSaleSku, reqCancelSale, reqSkuInfo, reqRemoveSku } from '@/api/product/sku'
import type { SkuResponseData, SkuData, SkuInfoData } from '@/api/product/sku/type'
import { ElMessage } from 'element-plus';
// 分頁器當前頁碼
let pageNo = ref<number>(1)
// 每一頁展示幾筆數據
let pageSize = ref<number>(10)
let total = ref<number>(0)
let skuArr = ref<SkuData[]>([])
// 控制抽屜顯示與隱藏
let drawer = ref<boolean>(false)
let skuInfo = ref<any>({})
// 當本路由元件一掛載完畢
onMounted(() => {
    getHasSku()
})
const getHasSku = async (pager = 1) => {
    // 當前分頁器頁碼
    pageNo.value = pager
    let result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)
    // console.log('result', result);
    if (result.code == 200) {
        total.value = result.data.total
        skuArr.value = result.data.records
    }
}
// 分頁器下拉選單(畫面右下處 每頁顯示幾筆數據)發生變化時觸發
const handler = () => {
    // console.log(pageSizes);
    getHasSku()
}
// 商品上架、下架操作
const updateSale = async (row: SkuData) => {
    // console.log(row);
    // 如果當前商品的isSale==1,說明當前商品世上架狀態->更新為下架
    // 否則else情況與上面情況相反
    if (row.isSale == 1) {
        // 下架操作
        await reqCancelSale((row.id as number))
        // 提示訊息
        ElMessage({ type: 'success', message: '下架 成功' })
        // 發請求取得當前更新完畢的全部的已有SKU
        getHasSku(pageNo.value)
    } else {
        // 上架操作
        await reqSaleSku((row.id as number))
        // 提示訊息
        ElMessage({ type: 'success', message: '上架 成功' })
        // 發請求取得當前更新完畢的全部的已有SKU
        getHasSku(pageNo.value)
    }
}
// 更新已有的SKU
const updateSku = () => {
    ElMessage({ type: 'success', message: '工程師加班更新中' })
}
// 點擊 查看商品詳情按鈕
const findSku = async (row: SkuData) => {
    // 抽屜展示
    drawer.value = true
    // 取得已有商品詳情數據
    // console.log('row', row);
    let result: SkuInfoData = await reqSkuInfo((row.id as number))
    // console.log('result', result);
    // 存儲已有SKU
    skuInfo.value = result.data
}
// 刪除某個已有商品
const removeSku = async (id: number) => {
    // 刪除某個已有商品請求
    let result: any = await reqRemoveSku(id)
    if (result.code == 200) {
        // 提示訊息
        ElMessage({ type: 'success', message: '刪除 成功' })
        // 取得已有全部商品
        getHasSku(skuArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
    } else {
        ElMessage({ type: 'error', message: '系统数据，不能删除' })
    }
}
</script>
    
<style scoped>
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>