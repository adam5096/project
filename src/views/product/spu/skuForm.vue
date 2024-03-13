<template>
    <el-form label-width="100px">
        <el-form-item label="SKU名稱">
            <el-input placeholder="SKU名稱" v-model="skuParams.skuName"></el-input>
        </el-form-item>
        <el-form-item label="價格(元)">
            <el-input placeholder="價格(元)" type="number" v-model="skuParams.price"></el-input>
        </el-form-item>
        <el-form-item label="重量(g)">
            <el-input placeholder="重量(g)" type="number" v-model="skuParams.weight"></el-input>
        </el-form-item>
        <el-form-item label="SKU描述">
            <el-input placeholder="SKU描述" type="textarea" v-model="skuParams.skuDesc"></el-input>
        </el-form-item>
        <el-form-item label="平台屬性">
            <el-form :inline="true">
                <el-form-item v-for="(item) in attrArr" :key="item.id" :label="item.attrName">
                    <el-select v-model="item.attrIdAndValueId" style="width: 150px;">
                        <el-option :value="`${item.id}:${attrValue.id}`" v-for="(attrValue) in item.attrValueList"
                            :key="attrValue.id" :label="attrValue.valueName"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="銷售屬性">
            <el-form :inline="true">
                <el-form-item :label="item.saleAttrName" v-for="(item) in saleArr" :key="item.id">
                    <el-select v-model="item.saleIdAndValueId" style="width: 150px;">
                        <el-option :value="`${item.id}:${saleAttrValue.id}`"
                            v-for="(saleAttrValue) in item.spuSaleAttrValueList" :key="saleAttrValue.id"
                            :label="saleAttrValue.saleAttrValueName"></el-option>

                    </el-select>
                </el-form-item>

            </el-form>
        </el-form-item>
        <el-form-item label="圖片名稱">
            <el-table border :data="imageArr" ref="table">
                <el-table-column type="selection" width="80px" align="center"></el-table-column>
                <el-table-column label="圖片">
                    <template #="{ row }">
                        <img :src="row.imgUrl" alt="圖片" style="width:100px;height:100px">
                    </template>
                </el-table-column>
                <el-table-column label="名稱" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <template #="{ row }">
                        <el-button type="warning" size="small" @click="handler(row)">設置默認</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default" @click="save">保存</el-button>
            <el-button type="primary" size="default" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>
    
<script setup lang='ts'>
// 引入請求API
import { reqAttr } from '@/api/product/attr'
import { reqSpuImageList, reqSpuHasSaleAttr, reqAddSku } from '@/api/product/spu'
import type { SkuData } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus';
import { ref, reactive } from 'vue'
// 存儲所有平台屬性
let attrArr = ref<any>([])
// 存儲所有銷售屬性
let saleArr = ref<any>([])
// 存儲所有照片牆數據
let imageArr = ref<any>([])
// 取得table元件實例
let table = ref<any>()
// 收集SKU參數
let skuParams = reactive<SkuData>({
    // 父元件傳遞過來的數據category3Id,spuId,tmId
    category3Id: '',//三級分類ID
    spuId: '',//已有的SPU的ID
    tmId: '',//SPU品牌ID
    // v-model收集
    skuName: '',//sku的名稱
    price: '',//sku的價格
    weight: '',//sku的重量
    skuDesc: '',//sku的描述
    skuAttrValueList: [//平台屬性蒐集
        // {
        //     attrId: '',//平台屬性ID
        //     valueId: '',//屬性值ID
        // }
    ],
    skuSaleAttrValueList: [//銷售屬性
        // {
        //     saleAttrId: '',//屬性名稱ID
        //     saleAttrValueId: '',//屬性值ID
        // }
    ],
    skuDefaultImg: '',//sku圖片地址
})
// 當前子元件方法對外暴露
const initSkuData = async (c1Id: number | string, c2Id: number | string, spu: any) => {
    // 收集數據
    skuParams.category3Id = spu.category3Id
    skuParams.spuId = spu.id
    skuParams.tmId = spu.tmId
    // 取得平台屬性
    // console.log(c1Id, c2Id,spu.category3Id);

    let result: any = await reqAttr(c1Id, c2Id, spu.category3Id,)
    // console.log('result', result);

    // 取得對應的銷售屬性
    let result1: any = await reqSpuHasSaleAttr(spu.id)
    // console.log('result1', result1);

    let result2: any = await reqSpuImageList(spu.id)
    // console.log('result2', result2);

    // 存儲所有平台屬性
    attrArr.value = result.data
    // 存儲所有銷售屬性
    saleArr.value = result1.data
    // 存儲所有照片牆數據
    imageArr.value = result2.data
}
// 取消按鈕
const cancel = () => {
    $emit('changeScene', { flag: 0, params: '' })
}
// 點擊設置預設圖片按鈕 方法
const handler = (row: any) => {
    // 點擊按鈕後,全部圖片複選框 序欄位取消勾選
    imageArr.value.forEach((item: any) => {
        table.value.toggleRowSelection(item, false)
    })
    // 複選框選中的圖片 才勾選序欄位
    table.value.toggleRowSelection(row, true)
    // 收集圖片地址
    skuParams.skuDefaultImg = row.imgUrl
}
// 點擊保存按鈕後 方法
const save = async () => {
    // 整理參數
    // 平台屬性
    skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
        if (next.attrIdAndValueId) {
            let [attrId, valueId] = next.attrIdAndValueId.split(':')
            prev.push({
                attrId, valueId
            })
        }
        return prev
    }, [])
    // 銷售屬性
    skuParams.skuSaleAttrValueList = saleArr.value.reduce((prev: any, next: any) => {
        if (next.saleIdAndValueId) {
            let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
            prev.push({
                saleAttrId, saleAttrValueId
            })
        }
        return prev
    }, [])
    // 發 新增sku的請求
    let result: any = await reqAddSku(skuParams)
    // console.log('result', result);
    if (result.code == 200) {
        // 請求成功
        ElMessage({
            type: 'success',
            message: '新增SKU 成功'
        })
        // 通知父元件將畫面切換到場景0
        $emit('changeScene',{flag:0,params:''})
    } else {
        // 請求失敗
        ElMessage({
            type: 'error',
            message: '新增SKU 失敗'
        })
    }

}
// 對外暴露方法
defineExpose({
    initSkuData
})
// 自定義事件方法
let $emit = defineEmits(['changeScene'])
</script>
    
<style scoped></style>