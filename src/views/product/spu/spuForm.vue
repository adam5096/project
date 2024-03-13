<template>
    <el-form label-width="100px">
        <el-form-item label="SPU名稱">
            <el-input placeholder="請輸入名稱" v-model="spuParams.spuName"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select v-model="spuParams.tmId">
                <el-option v-for="(item) in allTradeMark" :key="item.id" :label="item.tmName"
                    :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input type="textarea" placeholder="請輸入描述" v-model="spuParams.description"></el-input>
        </el-form-item>
        <el-form-item label="SPU圖片">
            <!-- 
                v-model:file-list 展示預設圖片
                action 上傳圖片的接口地址
                list-type 文件列表的類型
             -->
            <el-upload v-model:file-list="imgList" action="/api/admin/product/fileUpload" list-type="picture-card"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="handleUpload">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%;height: 100%;" />
            </el-dialog>
        </el-form-item>
        <el-form-item label="SPU銷售屬性">
            <!-- 展示銷售屬性下拉選單 -->
            <el-select style="width: 200px;" v-model="saleAttrIdAndValueName"
                :placeholder="unSelectSaleAttr.length ? `還有${unSelectSaleAttr.length}個未選擇` : '無'">
                <el-option :value="`${item.id}:${item.name}`" v-for="(item) in unSelectSaleAttr" :key="item.id"
                    :label="item.name"></el-option>

            </el-select>
            <el-button @click="addSaleAttr" :disabled="saleAttrIdAndValueName ? false : true" style="margin-left: 10px;"
                type="primary" size="default" icon="Plus">新增屬性</el-button>
        </el-form-item>
        <!-- 展示銷售屬性與值 -->
        <el-table border style="margin: 10px 0px;" :data="saleAttr">
            <el-table-column label="序" type="index" align="center" width="80px"></el-table-column>
            <el-table-column label="銷售屬性名稱" width="120px" prop="saleAttrName"></el-table-column>
            <el-table-column label="銷售屬性值">
                <!-- row為當前SPU已有的銷售屬性物件 -->
                <template #="{ row }">
                    <el-tag style="margin: 0px 5px;" @close="row.spuSaleAttrValueList.splice(index, 1)"
                        v-for="(item, index) in row.spuSaleAttrValueList" :key="row.id" closable>
                        {{ item.saleAttrValueName }}
                    </el-tag>
                    <el-input @blur="toLook(row)" v-model="row.saleAttrValue" v-if="row.flag == true" placeholder="請輸入屬性值"
                        size="small" style="width: 100px;"></el-input>
                    <el-button @click="toEdit(row)" v-else type="success" size="small" icon="Plus"></el-button>

                </template>

            </el-table-column>
            <el-table-column label="操作" width="120px">
                <template #="{ $index }">
                    <el-button type="danger" size="small" icon="Delete" @click="saleAttr.splice($index, 1)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-form-item>
            <el-button :disabled="saleAttr.length > 0 ? false : true" type="primary" size="default"
                @click="save">保存</el-button>
            <el-button type="primary" size="default" @click="cancel">取消</el-button>

        </el-form-item>
    </el-form>
</template>
    
<script setup lang='ts'>
import type { SpuData } from '@/api/product/spu/type'
import { ref, computed } from 'vue'
import { reqAllTradeMark, reqSpuImageList, reqSpuHasSaleAttr, reqAllSaleAttr, reqAddOrUpdateSpu } from '@/api/product/spu'
import type { SaleAttrValue, HasSaleAttr, SaleAttr, SpuImg, Trademark, AllTradeMark, SpuHasImg, SaleAttrResponseData, HasSaleAttrResponseData } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus';
let $emit = defineEmits(['changeScene'])
// import { onMounted } from 'vue'
// 子元件spuForm點擊取消按鈕，通知父元件spu切換場景為1,展示已有的SPU數據
const cancel = () => {
    // 點擊取消後,畫面留在當前頁
    $emit('changeScene', {flag:0,params:'update'})
}
// onMounted(() => {
//   console.log(123);

// })

// 存儲已有的SPU陣列
let allTradeMark = ref<Trademark[]>([])
// 商品圖片
let imgList = ref<SpuImg[]>([])
// 已有SPU銷售屬性
let saleAttr = ref<SaleAttr[]>([])
// 全部的銷售屬性
let allSaleAttr = ref<HasSaleAttr[]>([])
// 控制對話框顯示與隱藏效果(照片牆預覽按鈕)
let dialogVisible = ref<boolean>(false)
// 存儲預覽圖片地址
let dialogImageUrl = ref<string>('')
// 存儲已有SPU物件
let spuParams = ref<SpuData>({
    category3Id: '',//將來收集的三即分類ID
    spuName: '',//SPU名稱
    description: '',//SPU描述
    tmId: '',//品牌ID
    spuImageList: [],
    spuSaleAttrList: [],
})
// 將來收集還未選擇的銷售屬性的ID與屬性名稱
let saleAttrIdAndValueName = ref<string>('')
// 子元件書寫一個方法
const initHasSpuData = async (spu: SpuData) => {
    // 存儲已有SPU物件,將來在模板中展示
    spuParams.value = spu
    // spu為父元件傳遞過來的現有的SPU物件[不完整]
    // 取得全部品牌數據
    let result: AllTradeMark = await reqAllTradeMark()
    // 取得某一品牌旗下的全部售賣商品圖片
    let result1: SpuHasImg = await reqSpuImageList((spu.id as number))
    // 取得現有SPU銷售屬性數據
    let result2: SaleAttrResponseData = await reqSpuHasSaleAttr((spu.id as number))
    // 取得整個項目全部SPU的銷售屬性
    let result3: HasSaleAttrResponseData = await reqAllSaleAttr()
    // 存儲全部品牌數據
    allTradeMark.value = result.data
    // SPU對應商品圖片
    imgList.value = result1.data.map(item => {
        return {
            // name,url為Element-Plus元件庫中照片牆功能要求的屬性名稱
            // 故作屬性名稱轉換處理配合
            name: item.imgName,
            url: item.imgUrl
        }
    })
    // 存儲已有SPU銷售屬性
    saleAttr.value = result2.data
    // 存儲全部銷售屬性
    allSaleAttr.value = result3.data
}
// 點擊照片牆預覽按鈕鉤子
const handlePictureCardPreview = (file: any) => {
    dialogImageUrl.value = file.url
    // 對話框彈出來
    dialogVisible.value = true
}
// 照片牆刪除文件鉤子
const handleRemove = () => {

}
// 照片上傳成功之前的鉤子,約束文件大小與類型
const handleUpload = (file: any) => {
    if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif') {
        if (file.size / 1024 / 1024 < 3) {
            return true
        } else {
            ElMessage({
                type: 'error',
                message: '上傳文件務必小於3MB'
            })
        }
        return true
    } else {
        ElMessage({
            type: 'error',
            message: '上傳文件務必是PNG|JPF|GIF'
        })
        return false
    }
}
// 計算出當前SPU還未擁有的銷售屬性
let unSelectSaleAttr = computed(() => {
    // 全部的銷售屬性:顏色、版本、尺碼
    // 當前已有銷售屬性:顏色、版本
    let unSelectArr = allSaleAttr.value.filter(item => {
        return saleAttr.value.every(item1 => {
            return item.name != item1.saleAttrName
        })
    })
    return unSelectArr
})
// 新增銷售屬性 方法
const addSaleAttr = () => {
    // baseSaleAttrId: number
    // // 顏色
    // saleAttrName: string,
    // spuSaleAttrValueList: SpuSaleAttrValueList
    const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
    //  準備一個新的銷售屬性物件 將來帶給伺服器即可
    let newSaleAttr: SaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
    }
    // 追加到陣列當中
    saleAttr.value.push(newSaleAttr)
    // 清空收集的陣列
    saleAttrIdAndValueName.value = ''

}
// 屬性值按鈕點擊
const toEdit = (row: SaleAttr) => {
    // 點擊按鈕時,input元件出現>編輯模式
    row.flag = true
    row.saleAttrValue = ''
}
// 表單元素失去焦點時
const toLook = (row: SaleAttr) => {
    // console.log('row', row);
    // 收集到的屬性ID與屬性名字
    const { baseSaleAttrId, saleAttrValue } = row
    // console.log('row222', row);

    // 整理成伺服器所需要的屬性值形式
    let newSaleAttrValue: SaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: (saleAttrValue as string)
    }
    // 非法情況判斷
    if ((saleAttrValue as string).trim() == '') {
        ElMessage({
            type: 'error',
            message: '屬性值不得留白,請填寫'
        })
        return
    }
    // 判斷屬性值是否在陣列中已經存在
    let repeat = row.spuSaleAttrValueList.find(item => {
        return item.saleAttrValueName == saleAttrValue
    })
    if (repeat) {
        ElMessage({
            type: 'error',
            message: '屬性值出現重複,請改名'
        })
        return
    }
    // 追加新屬性值物件
    row.spuSaleAttrValueList.push(newSaleAttrValue)
    // 切換為查看模式
    row.flag = false
}
// 保存按鈕
const save = async () => {
    // 整理參數
    // 1:照片牆
    spuParams.value.spuImageList = imgList.value.map((item: any) => {
        return {
            imgName: item.name,//圖片名稱
            imgUrl: (item.response && item.response.data) || item.url//圖片地址
        }
    })
    // 整理銷售屬性的數據
    spuParams.value.spuSaleAttrList = saleAttr.value
    let result = await reqAddOrUpdateSpu(spuParams.value)

    // 發送請求:新增SPU|更新已有SPU
    if (result.code == 200) {
        // 請求成功
        ElMessage({
            type: 'success',
            message: spuParams.value.id ? '編輯 成功' : '新增 成功'
        })
        // 通知父元件spu 切換為場景0
        $emit('changeScene', {flag:0,params: spuParams.value.id ? 'update' : 'add' })
    } else {
        // 請求失敗
        ElMessage({
            type: 'error',
            message: spuParams.value.id ? '編輯 失敗' : '新增 失敗'
        })
    }
}

// 新增一個新的SPU初始化請求方法
const initAddSpu = async (c3Id: number | string) => {
    // 清空照片牆
    imgList.value = []
    // 清空銷售屬性
    saleAttr.value = []
    saleAttrIdAndValueName.value = ''
    // 清空數據
    Object.assign(spuParams.value, {
        category3Id: '',//將來收集的三即分類ID
        spuName: '',//SPU名稱
        description: '',//SPU描述
        tmId: '',//品牌ID
        spuImageList: [],
        spuSaleAttrList: [],
    })
    // 存放三級分類ID
    spuParams.value.category3Id = c3Id
    // 取得全部品牌數據
    let result: AllTradeMark = await reqAllTradeMark()
    // 取得整個項目全部SPU的銷售屬性
    let result1: HasSaleAttrResponseData = await reqAllSaleAttr()
    // 存儲數據
    allTradeMark.value = result.data
    allSaleAttr.value = result1.data
    // console.log('123');
}
// 對外匯出(露出)方法，使父元件能取得子元件方法
defineExpose({ initHasSpuData, initAddSpu })
</script>

<style scoped></style>